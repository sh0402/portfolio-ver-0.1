<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-row>
						<v-col cols="6">
							<v-card-text>
								<h1>
									Products & Brand<br />
									UI/UX & Web Design<br />
									experiences.
								</h1>
							</v-card-text>
						</v-col>
						<v-col cols="6">
							<v-card-text>
								<v-img></v-img>
							</v-card-text>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="4">
				<v-card>
					<v-card-text class="d-flex justify-space-between">
						<h2>About</h2>
						<span><v-icon>mdi-dots-vertical</v-icon></span>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="8">
				<v-card>
					<v-card-text class="d-flex justify-space-between">
						<h2>Works</h2>
						<span><v-icon>mdi-dots-vertical</v-icon></span>
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

<style lang="scss">
.row {
	display: flex;
	flex-wrap: wrap;
	flex: 1 1 auto;
	margin: 0;
}

#mainBnr {
	position: relative;
	width: 100%;
	height: 600px;
	--height: 600px;
	border-radius: 1rem;
	background-color: #fff;
	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
	margin-bottom: 2rem;

	.mainBnr-left {
		position: absolute;
		top: 50%;
		left: 0;
		width: 55%;
		padding: 0 4rem;
		transform: translate(0, -50%);

		h1 {
			font-size: 3rem;
			font-weight: 900;
			margin-bottom: 2rem;

			span {
				color: blue;
			}
		}
		p {
			color: #747474;
			font-size: 1.25rem;
		}
		p:not(:last-child) {
			margin-bottom: 2rem;
		}
	}

	.mainBnr-right {
		width: 50%;
		height: 0;
		padding-top: calc(var(--height) * 1);
		margin-left: auto;
		background: url(https://images.unsplash.com/photo-1432251407527-504a6b4174a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 0 1rem 1rem 0;
	}
}

// #aboutBnr {
// 	width: 100%;
// 	background-color: #fff;
// 	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
// 	border-radius: 1rem;

// 	padding: 2rem;

// 	h1 {
// 		font-size: 2rem;
// 		margin-bottom: 2rem;
// 		font-weight: 900;
// 		text-align: center;
// 	}

// 	.aboutBnr-head {
// 		display: flex;
// 		justify-content: space-between;
// 		margin-bottom: 2rem;

// 		h2 {
// 			font-size: 1.5rem;
// 			font-weight: 900;
// 		}
// 	}

// 	.aboutBnr-thumb {
// 		display: flex;
// 		justify-content: center;
// 		width: 200px;
// 		height: 200px;
// 		background-image: url('https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80');
// 		background-size: cover;
// 		background-position: center;
// 		border-radius: 50%;
// 		margin-left: auto;
// 		margin-right: auto;
// 		margin-bottom: 2rem;
// 	}

// 	.aboutBnr-item {
// 		display: flex;
// 		flex-wrap: wrap;
// 		justify-content: space-between;
// 		flex-direction: row;
// 		margin-left: auto;
// 		margin-right: auto;

// 		.aboutBnr-element {
// 			width: 49%;
// 			font-size: 1rem;
// 			color: blue;
// 			font-weight: bold;
// 			text-align: center;
// 			background-color: rgba(0, 116, 217, 0.1);
// 			border-radius: 0.5rem;
// 			padding: 1rem 0;
// 			margin: 0;
// 			margin-bottom: 0.5rem;
// 		}

// 		.aboutBnr-element:nth-child(2n) {
// 			margin-right: 0;
// 		}
// 	}
// }

// /* WORKS BANNER */
// #worksBnr {
// 	position: relative;
// 	width: 100%;
// 	margin-left: auto;
// 	border-radius: 1rem;
// 	padding: 2rem;
// 	background-color: #fff;
// 	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);

// 	h1 {
// 		font-size: 2rem;
// 		margin-bottom: 2rem;
// 		font-weight: 900;
// 		text-align: left;
// 	}

// 	.worksBnr-head {
// 		display: flex;
// 		justify-content: space-between;
// 		margin-bottom: 2rem;

// 		h2 {
// 			font-size: 1.5rem;
// 			font-weight: 900;
// 		}
// 	}
// }
</style>
