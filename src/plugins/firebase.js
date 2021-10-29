import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
// import store from '../store';
import firebaseConfig from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged(user => {});

Vue.prototype.$firebase = firebase;
