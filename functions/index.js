const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp({
	credential: admin.credential.cert(require('./key.json'))
})

const db = admin.firestore()

console.log(functions.config().admin.email)

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!')
})

exports.test = functions.https.onRequest(require('./test'))
exports.admin = functions.https.onRequest(require('./admin'))
exports.createUser = functions.auth.user().onCreate(async user => {
	const { uid, email, displayName, emailVerified, photoURL, disabled } = user
	const claims = { level: 2 }
	if (functions.config().admin.email === user.email && user.emailVerified)
		claims.level = 0
	await admin.auth().setCustomUserClaims(uid, claims)

	const d = {
		uid,
		email,
		displayName,
		emailVerified,
		photoURL,
		disabled,
		level: claims.level
	}
	const r = await db.collection('users').doc(uid).set(d)
	return r
})

exports.deleteUser = functions.auth.user().onDelete(user => {
	return db.collection('users').doc(user.uid).delete()
})

exports.incrementUserCount = functions.firestore
	.document('users/{userId}')
	// eslint-disable-next-line no-unused-vars
	.onCreate((snap, context) => {
		return db
			.collection('infos')
			.doc('users')
			.update('counter', admin.firestore.FieldValue.increment(1))
	})

exports.decrementUserCount = functions.firestore
	.document('users/{userID}')
	// eslint-disable-next-line no-unused-vars
	.onDelete((snap, context) => {
		return db
			.collection('infos')
			.doc('users')
			.update('counter', admin.firestore.FieldValue.increment(-1))
	})

db.collection('infos')
	.doc('users')
	.get()
	.then(sn => {
		if (!sn.exists) db.collection('infos').doc('users').set({ counter: 0 })
	})
