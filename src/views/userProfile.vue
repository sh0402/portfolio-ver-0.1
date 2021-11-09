<template>
	<div>
		<p>userProfile page</p>
		{{ JSON.stringify($store.state.claims, null, 2) }}
		<v-btn @click="tokenUpdate">tokenUpdate</v-btn>
		<!-- {{ $store.state.claims.level }} -->
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		async tokenUpdate() {
			const user = this.$firebase.auth().currentUser
			await user.getIdToken(true)
			await this.$store.dispatch('getUser', user)
		}
	}
}
</script>

<style></style>
