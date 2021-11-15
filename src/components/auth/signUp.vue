<template>
	<v-card flat color="transparent">
		<v-form v-model="valid" ref="form" lazy-validation>
			<v-card-title class="justify-space-between">
				<span class="title">Sing-Up</span>
				<span class="caption">
					or
					<a @click="$emit('changeType')">Log-in?</a>
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
					Create Google account
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
					label="First Name"
					v-model="form.firstName"
					:rules="[rule.required, rule.minLength(1), rule.maxLength(5)]"
					required
				></v-text-field>

				<v-text-field
					label="Last Name"
					v-model="form.lastName"
					:rules="[rule.required, rule.minLength(1), rule.maxLength(5)]"
					required
				></v-text-field>

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
				<v-checkbox
					label="Agreement"
					v-model="agree"
					:rules="[rule.agree]"
					required
				>
				</v-checkbox>
				<v-spacer />
				<v-btn
					:disabled="!valid"
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
					@click="createWithEmailAndPassword"
				>
					Join
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
				firstName: '',
				lastName: '',
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
			alert('Welcome')
			await this.$firebase.auth().signOut()
			this.$emit('changeType')
		},
		async createWithEmailAndPassword() {
			if (!this.$refs.form.validate())
				return this.$toasted.global.error(
					'Please fill out the input form correctly.'
				)
			await this.$firebase
				.auth()
				.createUserWithEmailAndPassword(this.form.email, this.form.password)
			const user = this.$firebase.auth().currentUser
			await user.updateProfile({
				displayName: `${this.form.lastName} ${this.form.firstName}`
			})

			await this.$firebase.auth().signOut()
			this.$emit('changeType')
			// console.log(result)
			// alert('Success')
		}
	}
}
</script>
