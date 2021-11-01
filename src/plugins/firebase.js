import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
// import store from '../store';

firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;
