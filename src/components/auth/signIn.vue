<template>
	<v-card flat>
		<v-form v-model="valid" ref="form" lazy-validation>
			<v-card-title class="justify-space-between">
				<span class="title">Sing-In</span>
				<span class="caption">or <a>Sign-Up?</a></span>
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

			<v-layout row wrap class="mx-4 mt-4 align-center">
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

			<v-card-actions class="pa-4">
				<v-checkbox label="Login Remember?"> </v-checkbox>
				<v-spacer />
				<v-btn color="primary" class="text-subtitle-2 text-none" depressed>
					Done
				</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
	<!-- <v-dialog v-model="dialogSignIn" class="mx-auto" max-width="374">
		<template #activator="{ on, attrs }">
			<slot name="activator" :on="on" :attrs="attrs">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-account</v-icon>
				</v-btn>

				<v-btn icon @click="signOut">
					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</slot>
		</template>

		<v-card>
			<v-form v-model="valid" ref="form" lazy-validation>
				<v-card-title class="justify-space-between">
					<span class="title">Sing-in</span>
					<v-btn icon @click="dialogSignIn = false"
						><v-icon>mdi-window-close</v-icon></v-btn
					>
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

				<v-layout row wrap class="mx-4 mt-4 align-center">
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
					<v-checkbox label="Login Remember?"> </v-checkbox>
				</v-card-text>
			</v-form>

			<v-divider></v-divider>

			<v-card-actions class="pa-4">
				<v-btn color="success" class="text-subtitle-2 text-none" depressed
					>Sign-up</v-btn
				>
				<v-spacer />
				<v-btn
					:loading="loading"
					color="primary"
					class="text-subtitle-2 text-none"
					depressed
				>
					Done
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog> -->
</template>

<script>
export default {
	data() {
		return {
			valid: false,
			email: '',
			password: ''
			// dialogSignIn: false
		};
	},
	methods: {
		async signInWithGoogle() {
			this.loading = true;
			const provider = await new this.$firebase.auth.GoogleAuthProvider();
			this.$firebase.auth().languageCode = 'ko';
			const r = this.$firebase.auth().signInWithPopup(provider);
			console.log(r);
		}
	}
};
</script>
