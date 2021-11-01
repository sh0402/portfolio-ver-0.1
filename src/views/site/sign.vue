<template>
	<v-dialog v-model="dialogSignIn" class="mx-auto" max-width="374">
		<template #activator="{ on, attrs }">
			<slot name="activator" :on="on" :attrs="attrs">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-account</v-icon>
				</v-btn>

				<v-btn icon @click="signOut" v-if="dialogSignIn">
					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</slot>
		</template>

		<v-card>
			<v-card-title class="justify-space-between mb-4">
				<span>Sing-in</span>
				<v-btn icon @click="dialogSignIn = false"
					><v-icon>mdi-window-close</v-icon></v-btn
				>
			</v-card-title>

			<v-card-text>
				<form>
					<v-text-field
						label="E-mail"
						type="email"
						value=""
						v-model="email"
					></v-text-field>
				</form>
				<form>
					<v-text-field
						label="Password"
						type="password"
						value=""
						v-model="password"
					></v-text-field>
				</form>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions class="py-4 text-center">
				<v-btn
					color="success"
					class="text-subtitle-2 text-none"
					depressed
					@click="
						if ((dialogSignIn = true)) {
							(dialogSignIn = false), (dialogSignUp = true);
						}
					"
					>Sign-up</v-btn
				>
				<v-spacer />
				<v-btn
					:loading="loading"
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
					@click="signInWithGoogle"
				>
					Google Log-in
				</v-btn>
				<v-btn
					:loading="loading"
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
					@click="signIn"
				>
					Done
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-dialog v-model="dialogSignUp" class="mx-auto" max-width="374">
			<v-card>
				<v-card-title class="justify-space-between mb-4">
					<span>Sing-up</span>
					<v-btn icon @click="dialogSignUp = false"
						><v-icon>mdi-window-close</v-icon></v-btn
					>
				</v-card-title>

				<v-card-text>
					<v-text-field
						label="Name"
						type="name"
						value=""
						v-model="name"
					></v-text-field>
					<v-text-field
						label="E-mail"
						type="email"
						value=""
						v-model="email"
					></v-text-field>
					<v-text-field
						label="Password"
						type="password"
						value=""
						v-model="password"
					></v-text-field>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions class="py-4 text-center">
					<v-btn
						color="success"
						class="text-subtitle-2 text-none"
						depressed
						@click="
							if ((dialogSignUp = true)) {
								(dialogSignUp = false), (dialogSignIn = true);
							}
						"
						>Sign-in</v-btn
					>
					<v-spacer />
					<v-btn
						:loading="loading"
						color="primary"
						class="text-subtitle-2 text-none"
						depressed
						@click="signUp"
						>Create Account</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-dialog>
</template>

<script>
export default {
	name: 'Auth',
	data() {
		return {
			dialogSignIn: false,
			dialogSignUp: false,
			name: '',
			email: '',
			password: '',
			loading: false
		};
	},
	methods: {
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider();
			this.$firebase.auth().languageCode = 'ko';
			const r = this.$firebase.auth().signInWithPopup(provider);
			console.log(r);
		},
		async signIn() {
			this.loading = true;
			await new this.$firebase.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(
					() => {
						this.loading = false;
						alert('Welcome');
						this.$router.replace('/about');
					},
					err => {
						this.loading = false;
						alert(`Error - ${err.message}`);
					}
				);
		},
		async signUp() {
			this.loading = true;
			await new this.$firebase.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(
					result => {
						console.log(result.user);
						result.user.updateProfile({ displayName: this.name });
						this.loading = false;
						alert('Registered successfully');
					},
					err => {
						this.loading = false;
						alert(`Error - ${err.message}`);
					}
				);
		},

		signOut() {
			this.$firebase.auth().signOut();
		}
	}
};
</script>

<style></style>
