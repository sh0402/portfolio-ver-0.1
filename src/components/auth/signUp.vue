<template>
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
</template>

<script>
export default {};
</script>

<style></style>
