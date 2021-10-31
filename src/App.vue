<template>
	<v-app id="App">
		<v-app-bar app color="white" light>
			<v-container class="d-flex">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-4"
					contain
					src="@/assets/logo.png"
					transition="scale-transition"
					width="40"
				/>

				<v-toolbar-items>
					<v-btn text> Home </v-btn>
					<v-btn text> About </v-btn>
					<v-btn text> Projects </v-btn>
					<v-btn text> Contact </v-btn>
				</v-toolbar-items>

				<v-spacer></v-spacer>

				<site-sign />
			</v-container>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
// import SiteSign from '@/views/site/sign';
import SiteSign from '@/views/site/sign';

export default {
	name: 'App',
	components: {
		SiteSign
		// SiteSign
	},
	data() {
		return {};
		///
	},
	methods: {}
};
</script>

<style lang="scss">
#App {
	margin-top: 1rem;
	background: #e5e5e5;
}
</style>
