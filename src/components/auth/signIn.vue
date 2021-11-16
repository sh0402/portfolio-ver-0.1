<template>
	<v-card flat color="transparent">
		<v-form v-model="valid" ref="form" lazy-validation>
			<v-card-title class="justify-space-between">
				<span class="title">Sing-In</span>
				<span class="caption">
					or
					<a @click="$emit('changeType')">Sign-Up?</a>
				</span>
			</v-card-title>

			<v-card-actions class="pa-4" justify-space-around>
				<v-btn
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
					block
					@click="signInWithGoogle"
				>
					<v-icon size="16">mdi-google</v-icon>
					<v-divider vertical></v-divider>
					Google Log-in
				</v-btn>
			</v-card-actions>

			<v-layout row wrap class="mx-4 align-center">
				<v-flex>
					<v-divider></v-divider>
				</v-flex>
				<v-flex xs2 class="text-center"> or </v-flex>
				<v-flex xs5>
					<v-divider></v-divider>
				</v-flex>
			</v-layout>

			<v-card-text>
				<v-text-field
					label="E-mail"
					v-model="form.email"
					:rules="[
						rule.required,
						rule.minLength(5),
						rule.maxLength(50),
						rule.email
					]"
					required
					type="email"
				></v-text-field>

				<v-text-field
					label="Password"
					v-model="form.password"
					:rules="[rule.required, rule.minLength(6), rule.maxLength(12)]"
					required
					type="password"
				></v-text-field>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions class="pa-4">
				<v-checkbox label="Login Remember?"> </v-checkbox>
				<v-spacer />
				<v-btn
					:disabled="!valid"
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
					@click="signInWithEmailAndPassword"
				>
					Done
				</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			valid: false,
			form: {
				email: '',
				password: ''
			},
			agree: false,
			rule: {
				required: v => !!v || 'This is a required.',
				minLength: length => v =>
					v.length >= length || `Please enter at least ${length} characters.`,
				maxLength: length => v =>
					v.length <= length || `Must be less than ${length} characters.`,
				email: v => /.+@.+/.test(v) || 'E-mail must be valid.',
				agree: v => !!v || 'Agreement to terms and conditions is required.'
			}
		}
	},
	methods: {
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider()
			this.$firebase.auth().languageCode = 'ko'
			await this.$firebase.auth().signInWithPopup(provider)
			const user = this.$firebase.auth().currentUser
			await user.getIdToken()
			await this.$store.dispatch('getUser', user)
			if (this.$store.state.claims.level === undefined)
				return this.$router.push('/userProfile')
			this.$router.push('/')
		},
		async signInWithEmailAndPassword() {
			if (!this.$refs.form.validate())
				return this.$toasted.global.error(
					'Please fill out the input form correctly.'
				)
			await this.$firebase
				.auth()
				.signInWithEmailAndPassword(this.form.email, this.form.password)
			alert('Success')
			const user = this.$firebase.auth().currentUser
			await user.getIdToken()
			await this.$store.dispatch('getUser', user)
			if (this.$store.claims.level === undefined)
				return this.$router.push('/userProfile')
			this.$router.push('/')
		}
	}
}
</script>
