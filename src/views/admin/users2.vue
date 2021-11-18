<template>
	<v-container style="max-width: 1200px" grid-list-md fluid>
		<v-card>
			<v-toolbar dark color="teal">
				<v-toolbar-title>Members</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-autocomplete
					v-model="email"
					:items="emails"
					:search-input.sync="search"
					label="Please write the email"
					cache-items
					flat
					hide-no-data
					hide-details
					solo-inverted
					clearable
					class="mx-4"
					:loading="loadingSearch"
				></v-autocomplete>
				<v-btn icon @click="list" :disabled="loading">
					<v-icon>mdi-refresh</v-icon>
				</v-btn>
			</v-toolbar>

			<!-- <v-card-text>
				<v-data-table
					:headers="headers"
					:items="items"
					:options.sync="options"
					:server-items-length="totalCount"
					:items-per-page="4"
					must-sort
					class="elevation-1"
					:loading="loading"
				></v-data-table>
			</v-card-text> -->

			<v-card-text>
				<v-data-iterator
					:items="items"
					:options.sync="options"
					:server-items-length="totalCount"
					:items-per-page="4"
				>
					<template v-slot:default="props">
						<v-row dense>
							<v-col cols="12" v-if="loading" class="text-center">
								<v-progress-circular
									indeterminate
									color="primary"
								></v-progress-circular>
								<p color="grey">Loading... Please wait</p>
							</v-col>
							<v-col
								v-else
								v-for="item in props.items"
								:key="item.email"
								cols="12"
								sm="6"
								md="4"
								lg="3"
							>
								<v-card>
									<!-- <v-card-title class="subheading font-weight-bold">
										{{ item.email }}
									</v-card-title>
									<v-divider></v-divider>
									<v-list dense>
										<v-list-item>
											<v-list-item-content>Calories:</v-list-item-content>
											<v-list-item-content class="align-end">
												{{ item.displayName }}
											</v-list-item-content>
										</v-list-item>
									</v-list> -->
									<v-list-item three-line>
										<v-list-item-avatar tile size="96" color="grey">
											<v-img :src="item.photoURL | imgCheck"> </v-img>
										</v-list-item-avatar>
										<v-list-item-content>
											<div class="text-overline mb-4">
												User Level : {{ item.level }}
											</div>
											<v-list-item-subtitle class="font-weight-bold">
												{{ item.displayName | nameCheck }}
											</v-list-item-subtitle>
											<v-list-item-subtitle class="text-caption">
												{{ item.email }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>

									<!-- <v-card-actions>
										<v-btn outlined rounded text> Button </v-btn>
									</v-card-actions> -->
								</v-card>
							</v-col>
						</v-row>
					</template>
				</v-data-iterator>
			</v-card-text>
			<!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="list">get list</v-btn>
        </v-card-actions> -->
		</v-card>
	</v-container>
</template>

<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
import _ from 'lodash'

export default {
	data() {
		return {
			headers: [
				{ text: 'uid', value: 'uid' },
				{ text: 'email', value: 'email' },
				{ text: 'displayName', value: 'displayName' },
				{ text: 'photoURL', value: 'photoURL' },
				{ text: 'level', value: 'level' }
			],
			items: [],
			totalCount: 0,
			loading: false,
			loadingSearch: false,
			options: {
				sortBy: ['email'],
				sortDesc: [false]
			},
			search: '',
			emails: [],
			email: null
		}
	},
	watch: {
		options: {
			handler() {
				this.list()
			},
			deep: true
		},
		search(val) {
			val && val !== this.select && this.searchEmails(val)
		},
		email(n, o) {
			if (n !== o) this.list()
		}
	},
	filters: {
		nameCheck(v) {
			if (v) return v
			return 'no name'
		},
		imgCheck(v) {
			if (v) return v
			return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
	},
	methods: {
		async list() {
			this.loading = true
			const r = await this.$axios.get('/admin/users2', {
				params: {
					offset:
						this.options.page > 0
							? (this.options.page - 1) * this.options.itemsPerPage
							: 0,
					limit: this.options.itemsPerPage,
					order: this.options.sortBy[0],
					sort: this.options.sortDesc[0] ? 'desc' : 'asc',
					search: this.search
				}
			})
			this.totalCount = r.data.totalCount
			this.items = r.data.items
			this.loading = false
		},
		// async searchEmails() {
		// 	this.loadingSearch = true
		// 	const { data } = await this.$axios.get('/admin/search')
		// 	this.emails = data
		// 	this.loadingSearch = false
		// },
		searchEmails: _.debounce(function (val) {
			this.loadingSearch = true

			this.$axios
				.get('/admin/search', {
					params: {
						search: this.search
					}
				})
				.then(({ data }) => {
					this.emails = data
				})
				.catch(e => {
					this.$toasted.global.error(e.message)
				})
				.finally(e => {
					this.list()
					this.loadingSearch = false
				})
		}, 500)
	}
}
</script>

<style></style>
