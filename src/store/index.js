import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: 'basic title',
		user: null,
		token: '',
		claims: null,
		firebaseLoaded: false
	},
	mutations: {
		setTitle(state, payload) {
			state.title = payload
		},
		setUser(state, user) {
			state.user = user
		},
		setToken(state, token) {
			state.token = token
		},
		setClaims(state, claims) {
			state.claims = claims
		},
		setFirebaseLoaded(state) {
			state.firebaseLoaded = true
		}
	},
	actions: {
		async getUser({ commit }, user) {
			commit('setFirebaseLoaded')
			commit('setUser', user)
			if (!user) return null
			const token = await user.getIdToken()
			commit('setToken', token)
			const { claims } = await user.getIdTokenResult()
			commit('setClaims', claims)
			// .then(token => {
			// 	// console.log(token)
			// 	commit('setToken', token)
			// 	return user.getIdTokenResult()
			// })
			// .then(r => {
			// 	// console.log(r)
			// 	commit('setClaims', r.claims)
			// })
			return true
		}
	},
	modules: {}
})
