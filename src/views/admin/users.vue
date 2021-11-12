<template>
	<v-card>
		<v-card-title primary-title> 사용자 관리 </v-card-title>
		<v-card-text>
			<v-data-table
				:headers="headers"
				:items="items"
				:server-items-length="totalCount"
				:loading="loading"
				class="elevation-1"
			></v-data-table>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="list">get list</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{
					text: 'User-Key',
					value: 'uid'
				},
				{ text: '이메일', value: 'email' },
				{ text: '이름', value: 'displayName' },
				{ text: 'photoURL', value: 'photoURL' }
			],
			items: [],
			totalCount: 0,
			loading: false,
			options: {}
		}
	},
	methods: {
		async list() {
			const { data } = await this.$axios.get('/admin/users')
			this.totalCount = data.totalCount
			this.items = data.items
		}
	}
}
</script>

<style></style>
