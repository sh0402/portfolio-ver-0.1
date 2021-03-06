import Vue from 'vue'
import axios from 'axios'
import store from '../store'

const firebaseAPI = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://us-central1-myportfolio-soot.cloudfunctions.net/'
			: 'http://localhost:5000/myportfolio-soot/us-central1/',
	timeout: 5000,
	headers: { 'X-Custom-Header': 'foobar' }
})

firebaseAPI.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		config.headers.authorization = store.state.token
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

Vue.prototype.$axios = firebaseAPI
