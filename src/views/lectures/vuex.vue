<template>
	<div>
		<v-btn color="primary" @click="set">set</v-btn>
	</div>
</template>

<script>
export default {
	methods: {
		set() {
			this.$store.commit('setTitle', 'change title')
		}
	}
}
</script>

<style></style>
