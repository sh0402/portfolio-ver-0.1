<template>
	<v-app>
		<v-app-bar app color="white" light>
			<v-container class="d-flex">
				<div class="d-flex align-center">
					<v-img
						alt="Vuetify Logo"
						class="shrink mr-4"
						contain
						src="@/assets/logo.png"
						transition="scale-transition"
						width="40"
					/>
				</div>

				<v-toolbar-items>
					<v-btn text> Home </v-btn>
					<v-btn text> About </v-btn>
					<v-btn text> Projects </v-btn>
					<v-btn text> Contact </v-btn>
				</v-toolbar-items>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon>mdi-account</v-icon>
				</v-btn>
			</v-container>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	})
};
</script>
