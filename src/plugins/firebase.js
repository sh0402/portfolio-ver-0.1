import Vue from 'vue';
import firebase from 'firebase/app';
import store from '../store';
import router from '../router';
import 'firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
// import store from '../store';

firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;

Vue.prototype.$isFirebaseAuth = false;

firebase.auth().onAuthStateChanged(user => {
	Vue.prototype.$isFirebaseAuth = true;
	console.log('here?');
	console.log(user);
	if (user) {
		router.push('/');
	} else {
		router.push('/sign');
	}
	store.commit('setUser', user);
	store.dispatch('getUser', user);
});
