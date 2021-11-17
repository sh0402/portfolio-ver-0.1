<template>
	<v-app id="App">
		<v-navigation-drawer v-model="drawer" fixed width="100%">
			<v-toolbar
				id="toolbar-mo"
				color="transparent"
				class="font-weight-bold"
				justify-end
				flat
			>
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
							{{ (item.title, item.to) }}
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

		<v-app-bar app color="white">
			<v-toolbar max-width="1200" class="mx-auto" flat>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					width="32"
					height="32"
					@click="drawer = !drawer"
				></v-app-bar-nav-icon>
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2 hidden-sm-and-down"
					contain
					src="./assets/logo.png"
					transition="scale-transition"
					width="32"
				/>
				<v-btn
					v-for="item in items"
					:key="item.a"
					:to="item.to"
					text
					plain
					class="hidden-sm-and-down"
				>
					{{ item.title }}
				</v-btn>

				<v-spacer></v-spacer>

				<!-- <v-avatar color="grey darken-1" size="32"></v-avatar>
				<v-btn icon @click="signOut" width="32" height="32">
					<v-icon>mdi-login-variant</v-icon>
				</v-btn> -->
				<!-- <v-toolbar-side-icon v-if="$store.state.user"></v-toolbar-side-icon> -->

				<v-btn icon v-if="$store.state.user">
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-avatar size="32" color="grey lighten-4">
									<img :src="$store.state.user.photoURL" alt="avatar" />
								</v-avatar>
							</v-btn>
						</template>

						<v-card width="320">
							<v-container>
								<v-row dense>
									<v-col cols="12">
										<v-card elevation="0" disabled>
											<v-img
												:src="$store.state.user.photoURL"
												alt="avatar"
												aspect-ratio="2"
												max-height="150"
											/>
										</v-card>
									</v-col>

									<v-col cols="12" class="my-4">
										<span class="font-weight-bold">
											{{ $store.state.user.displayName }}
										</span>

										<br />

										<span>
											{{ $store.state.user.email }}
										</span>
									</v-col>

									<v-col cols="12">
										<v-divider class="mb-4"></v-divider>
										<v-btn block color="warning" @click="signOut">
											Log-out
										</v-btn>
									</v-col>
								</v-row>
							</v-container>
						</v-card>
					</v-menu>
				</v-btn>
			</v-toolbar>
		</v-app-bar>

		<v-main>
			<vue-progress-bar></vue-progress-bar>

			<v-container
				style="max-width: 1200px"
				grid-list-md
				v-if="!$store.state.firebaseLoaded"
			>
				<v-layout row wrap text-center align-center justify-center>
					<v-card color="transparent" flat>
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
export default {
	name: 'App',
	data() {
		return {
			type: false,
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
				},
				{
					title: 'lv0',
					icon: 'mdi-text-long',
					to: '/test/lv0'
				},
				{
					title: 'lv1',
					icon: 'mdi-text-long',
					to: '/test/lv1'
				},
				{
					title: 'lv2',
					icon: 'mdi-text-long',
					to: '/test/lv2'
				}
			]
		}
	},
	methods: {
		async signOut() {
			this.$firebase.auth().signOut()
			this.$router.push('/sign')
			// this.$Progress.start()
		}
	}
}
</script>

<style lang="scss">
#App {
	background: #e5e5e5;
}

#toolbar-mo {
	padding: 0 16px;
}
</style>
