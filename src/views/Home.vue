<template>
	<v-container> </v-container>
</template>

<script>
export default {
	name: 'Home',

	components: {}
}
</script>

<style lang="scss">
#firstBanner {
	background-color: #fff;
}
h1 {
	font-size: 3rem;
	font-weight: 900;
	margin-bottom: 2rem;

	span {
		color: yellow;
	}
}

p {
	color: #747474;
	font-size: 1.25rem;

	&:not(:last-child) {
		margin-bottom: 2rem;
	}
}
</style>
