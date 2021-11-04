<template>
	<v-container grid-list-md>
		<v-card class="rounded-xl py-16">
			<v-layout row wrap align-center justify-center>
				<v-flex xs12 sm5 class="hidden-xs-only" text-center>
					<v-img icon><v-icon size="500">mdi-account-box</v-icon></v-img>
				</v-flex>
				<v-flex xs12 sm5>
					<sign-in v-if="type" />
					<sign-up v-else />
				</v-flex>
			</v-layout>
		</v-card>
	</v-container>
</template>

<script>
import SignIn from '@/components/auth/signIn';
import SignUp from '@/components/auth/signIn';

export default {
	data() {
		return {
			type: false
		};
	},
	components: {
		SignIn,
		SignUp
	}
};
</script>
