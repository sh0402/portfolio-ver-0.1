<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-row align="center" justify="center">
						<v-col cols="12" lg="6">
							<v-card-text>
								<h1 class="text-h3 mb-4 font-weight-bold">
									Products & Brand<br />
									UI/UX & Web Design<br />
									experiences.
								</h1>
								<p class="text-subtitle-2">
									Hello, I'm Soohwan Kim, Designer of Web & Products. I
									specialize in UI/UX design, responsive web design and product
									packaging design. Thank you for visiting my portfolio site.
								</p>

								<p>{{ JSON.stringify($store.state.claims, null, 2) }}</p>
							</v-card-text>
						</v-col>
						<v-col cols="12" lg="6">
							<v-card-text>
								<v-img
									src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80"
								></v-img>
							</v-card-text>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" lg="4" md="5" sm="6">
				<v-card>
					<v-card-text class="d-flex align-center justify-space-between">
						<h2>About</h2>
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>

					<v-card-text class="d-flex flex-column align-center">
						<v-img
							width="200"
							height="200"
							class="rounded-circle"
							src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
						>
						</v-img>
					</v-card-text>

					<v-card-text>
						<h2 class="mb-4">Lorem ipsum dolor sit amet, consectetur</h2>
						<v-chip-group column multiple>
							<v-chip filter outlined>#Photoshop</v-chip>
							<v-chip filter outlined>#illustrator</v-chip>
							<v-chip filter outlined>#UI/UX</v-chip>
							<v-chip filter outlined>#Web_Developer</v-chip>
							<v-chip filter outlined>#Package</v-chip>
							<v-chip filter outlined>#Furniture</v-chip>
							<v-chip filter outlined>#Graphic</v-chip>
							<v-chip filter outlined>#Product_Branding</v-chip>
						</v-chip-group>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" lg="8" md="7" sm="6">
				<v-card>
					<v-card-text class="d-flex align-center justify-space-between">
						<h2>Works</h2>
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>

					<v-card-text>
						<h2 class="mb-4">
							Design that solves problems, one product at a time
						</h2>

						<v-sheet class="mx-auto">
							<v-slide-group class="pa-0" center-active show-arrows>
								<v-slide-item
									v-for="n in 15"
									:key="n"
									v-slot="{ active, toggle }"
								>
									<v-card
										:color="active ? 'primary' : 'grey lighten-1'"
										class="ma-2"
										height="300"
										width="250"
										@click="toggle"
									>
										<v-row class="fill-height" align="center" justify="center">
											<v-scale-transition>
												<v-icon
													v-if="active"
													color="white"
													size="10"
													v-text="'mdi-close-circle-outline'"
												></v-icon>
											</v-scale-transition>
										</v-row>
									</v-card>
								</v-slide-item>
							</v-slide-group>
						</v-sheet>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Home',

	components: {}
}
</script>
