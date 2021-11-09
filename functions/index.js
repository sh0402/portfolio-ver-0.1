const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp()

const db = admin.firestore()

// console.log(functions.config().admin.email)

exports.helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true })
	response.send('Hello from Firebase!')
})

exports.test = functions.https.onRequest(require('./test'))
exports.createUser = functions.auth.user().onCreate(async user => {
	const { uid, email, displayName, emailVerified, photoURL, disable } = user
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
		disable
	}
	const r = await db.collection('users').doc(uid).set(d)
	return r
})

exports.deleteUser = functions.auth.user().onDelete(async user => {
	const r = await db.collection('users').doc(user.uid).delete()
	return r
})
