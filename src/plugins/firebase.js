import Vue from 'vue'
import firebase from 'firebase/app'
import store from '../store'
// import router from '../router'
import 'firebase/firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'
// import store from '../store';

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

Vue.prototype.$isFirebaseAuth = false

firebase.auth().onAuthStateChanged(user => {
	store.dispatch('getUser', user)
	const { uid, email, displayName, emailVerified, claims } = user
	const userData = { uid, email, displayName, emailVerified, claims }
	console.log(userData)
	// 	.then(() => {
	// 	if (user) {
	// 		router.push('/')
	// 	} else {
	// 		router.push('/sign')
	// 	}
	// })
})
