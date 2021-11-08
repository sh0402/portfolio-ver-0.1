<template>
	<v-app id="App">
		<v-navigation-drawer v-model="drawer" fixed width="100%">
			<v-toolbar flat color="transparent" class="font-weight-bold" justify-end>
				<v-toolbar-title class="pr-4"> Soot's Portfoilo </v-toolbar-title>
				<span class="caption">ver.0.0.1</span>
				<v-spacer></v-spacer>
				<v-btn icon @click="drawer = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<v-divider />

			<v-list>
				<v-list-item v-for="item in items" :key="item.a" :to="item.to">
					<v-list-item-avatar>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>
							{{ item.title }}
						</v-list-item-title>
					</v-list-item-content>
					<!-- <v-list-item-action>
						<v-btn icon ripple>
							<v-icon color="grey lighten-1"> mdi-chevron-down </v-icon>
						</v-btn>
					</v-list-item-action> -->
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="white" flat>
			<v-container class="py-0 fill-height">
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					width="32"
					height="32"
					@click="drawer = !drawer"
				></v-app-bar-nav-icon>

				<v-btn
					v-for="link in links"
					:key="link"
					text
					class="hidden-sm-and-down"
				>
					{{ link }}
				</v-btn>

				<v-spacer></v-spacer>

				<v-avatar color="grey darken-1" size="32"></v-avatar>
				<v-btn icon @click="signOut" width="32" height="32">
					<v-icon>mdi-login-variant</v-icon>
				</v-btn>
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

			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
// import SignIn from '@/components/auth/signIn'
// import SignUp from '@/components/auth/signIn'

export default {
	name: 'App',
	components: {
		// SignIn,
		// SignUp
	},
	data() {
		return {
			type: false,
			links: ['Home', 'About', 'Project', 'Contact'],
			drawer: false,
			items: [
				{
					title: 'Home',
					icon: 'mdi-home',
					to: '/'
				},
				{
					title: 'About',
					icon: 'mdi-information',
					to: '/about'
				},
				{
					title: 'Projects',
					icon: 'mdi-view-gallery',
					to: '/projects'
				},
				{
					title: 'Contact',
					icon: 'mdi-account-box',
					to: '/contact'
				}
			]
		}
	},
	methods: {
		signOut() {
			this.$firebase.auth().signOut()
			// this.$Progress.start()
		}
	}
}
</script>

<style>
#App {
	background: #e5e5e5;
}
</style>
