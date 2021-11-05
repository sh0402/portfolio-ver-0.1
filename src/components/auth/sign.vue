<template>
	<v-container grid-list-md>
		<v-card width="1200" height="650">
			<v-layout row wrap align-center justify-center>
				<v-flex xs12 sm5 class="hidden-xs-only" text-center>
					<v-img></v-img>
				</v-flex>
				<v-flex xs12 sm5>
					<sign-in v-if="type" @changeType="type = !type" />
					<sign-up v-else @changeType="type = !type" />
				</v-flex>
			</v-layout>
		</v-card>
	</v-container>
</template>

<script>
import SignIn from '@/components/auth/signIn'
import SignUp from '@/components/auth/signUp'

export default {
	data() {
		return {
			type: false
		}
	},
	components: {
		SignIn,
		SignUp
	}
}
</script>
