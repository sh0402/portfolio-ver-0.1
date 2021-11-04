<template>
	<v-app id="App">
		<v-app-bar app color="white" light>
			<v-container class="d-flex">
				<!-- <v-img
					alt="Vuetify Logo"
					class="shrink mr-4"
					contain
					src="@/assets/logo.png"
					transition="scale-transition"
					width="40"
				/> -->
				<v-toolbar-title>SOOT</v-toolbar-title>
				<v-toolbar-items class="height: 32">
					<v-btn text> Home </v-btn>
					<v-btn text> About </v-btn>
					<v-btn text> Projects </v-btn>
					<v-btn text> Contact </v-btn>
				</v-toolbar-items>

				<v-spacer></v-spacer>

				<!-- <sign-in v-if="type" />
				<sign-up v-else /> -->
				<v-btn @click="signOut">Sign-Out</v-btn>
			</v-container>
		</v-app-bar>

		<v-main>
			<v-container grid-list-md>
				<v-layout row wrap align-center text-center justify-center>
					<v-card color="transparent" flat v-if="!$isFirebaseAuth">
						<v-card-text>
							<v-progress-circular
								indeterminate
								color="primary"
							></v-progress-circular>
						</v-card-text>
						<v-card-text> 인증 상태를 기다리는 중입니다. </v-card-text>
					</v-card>
				</v-layout>
			</v-container>

			<router-view />

			<!-- <vue-progress-bar></vue-progress-bar> -->
		</v-main>
	</v-app>
</template>

<script>
// // import SiteSign from '@/views/site/sign';
// import SignIn from '@/components/auth/signIn';
// import SignUp from '@/components/auth/signIn';

export default {
	name: 'App',
	components: {
		// SignIn,
		// SignUp
	},
	data() {
		return {
			type: false,
			email: '',
			password: ''
		}
		///
	},
	methods: {
		signOut() {
			this.$firebase.auth().signOut()
			this.$Progress.start()
		}
	}
}
</script>

<style lang="scss">
#App {
	margin-top: 1rem;
	background: #e5e5e5;
}
</style>
