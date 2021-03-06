import Vue from 'vue'
import Toasted from 'vue-toasted'

// you can also pass options, check options reference below
Vue.use(Toasted, {
	iconPack: 'mdi'
})

Vue.toasted.register(
	'error',
	payload => {
		return payload
	},
	{
		icon: 'mdi-alert-circle',
		position: 'bottom-right',
		duration: 5000,
		className: 'subheading',
		action: {
			text: 'Cancel',
			onClick: (e, toastObject) => {
				toastObject.goAway(0)
			}
		}
	}
)
