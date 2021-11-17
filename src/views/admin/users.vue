<template>
	<v-container style="max-width: 1200px" fluid>
		<v-card>
			<v-toolbar dark color="teal">
				<v-toolbar-title>Members</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-autocomplete
					v-model="email"
					:loading="loadingSearch"
					:items="emails"
					:search-input.sync="search"
					cache-items
					class="mx-4"
					flat
					hide-no-data
					hide-details
					label="Please write the email"
					solo-inverted
					clearable
				></v-autocomplete>
			</v-toolbar>

			<v-card-text>
				<!-- <v-data-table
					:headers="headers"
					:items="items"
					:server-items-length="totalCount"
					:options.sync="options"
					:items-per-page="5"
					:loading="loading"
					class="elevation-1"
					must-sort
				></v-data-table> -->

				<v-data-iterator
					:items="items"
					:options.sync="options"
					:server-items-length="totalCount"
					:items-per-page="4"
					:loading="loading"
				>
					<template v-slot:default="props">
						<v-row wrap>
							<v-flex xs12 v-if="loading" class="text-center">
								<v-progress-circular
									indeterminate
									color="primary"
								></v-progress-circular>
							</v-flex>
							<v-col
								v-for="item in props.items"
								:key="item.email"
								cols="12"
								sm="6"
								md="4"
								lg="3"
							>
								<v-card>
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
												></v-select>
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
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

<script>
import _ from 'lodash'

export default {
	data() {
		return {
			headers: [
				{
					text: 'uid',
					value: 'uid'
				},
				{ text: 'email', value: 'email' },
				{ text: 'displayName', value: 'displayName' },
				{ text: 'photoURL', value: 'photoURL' },
				{ text: 'level', value: 'level' }
			],
			items: [],
			totalCount: 0,
			loading: false,
			options: {
				sortBy: ['email'],
				sortDesc: [false]
			},
			search: '',
			emails: [],
			email: null,
			loadingSearch: false,
			levels: [
				{ value: 0, text: 'Administrator' },
				{ value: 1, text: 'Normal User' },
				{ value: 2, text: 'Guest' }
			]
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
			return 'empty name'
		},
		imgCheck(v) {
			if (v) return v
			return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
	},
	methods: {
		async list() {
<<<<<<< HEAD
			const r = await this.$axios.get('/admin/users')
			console.log(r)
		}
=======
			this.loading = true
			const r = await this.$axios.get('/admin/users', {
				params: {
					offset:
						this.options.page > 0
							? (this.options.page - 1) * this.options.itemsPerPage
							: 0,
					limit: this.options.itemsPerPage,
					order: this.options.sortBy[0],
					sort: this.options.sortDesc[0] ? 'desc' : 'asc',
					search: this.email
				}
			})
			this.totalCount = r.data.totalCount
			this.items = r.data.items
			this.loading = false
			// console.log(this.options)
		},
		// async searchEmails() {
		// 	this.loadingSearch = true
		// 	const { data } = await this.$axios.get('/admin/search')
		// 	this.emails = data
		// 	this.loadingSearch = false
		// }
		// eslint-disable-next-line no-unused-vars
		searchEmails: _.debounce(function (val) {
			this.loadingSearch = true

			this.$axios
				.get('/admin/search', {
					params: { search: this.search }
				})
				.then(({ data }) => {
					this.emails = data
					// console.log(this.emails)
				})
				.catch(e => {
					this.$toasted.global.error(e.message)
				})
				.finally(() => {
					this.loadingSearch = false
				})
		}, 500)
>>>>>>> 75403258bb38d3cf0d566759539c722817b3dc2a
	}
}
</script>

<style></style>
