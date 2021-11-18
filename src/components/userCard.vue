<template>
	<v-card :loading="loading">
		<v-list-item three-line>
			<v-list-item-avatar size="125" tile>
				<v-img :src="item.photoURL | imgCheck"></v-img>
			</v-list-item-avatar>

			<v-list-item-content class="align-self-start">
				<v-list-item-title
					class="mb-2 font-weight-bold"
					v-text="item.email"
				></v-list-item-title>

				<v-list-item-subtitle>
					{{ item.displayName | nameCheck }}
				</v-list-item-subtitle>

				<v-list-item-subtitle>
					<v-select
						class="ma-1"
						v-model="item.level"
						:items="levels"
						solo
						hide-details
						@change="levelChange(item)"
					></v-select>
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
export default {
	props: ['item'],
	data() {
		return {
			loading: false,
			levels: [
				{ value: 0, text: 'Administrator' },
				{ value: 1, text: 'Normal User' },
				{ value: 2, text: 'Guest' }
			]
		}
	},
	filters: {
		nameCheck(v) {
			if (v) return v
			return 'empty name'
		},
		imgCheck(v) {
			if (v) return v
			return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
	},
	methods: {
		levelChange(v) {
			this.loading = true
			this.$axios
				.patch(`/admin/user/${v.uid}/level`, { level: v.level })
				.catch(e => {
					this.$toasted.global.error(e.message)
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
