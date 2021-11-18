const admin = require('firebase-admin')
// const db = admin.firestore()

module.exports = (req, res, next) => {
	// console.log(JSON.stringify(req.headers))
	console.log('here')

	admin
		.auth()
		.verifyIdToken(req.headers.authorization)
		.then(decodedToken => {
			req.claims = decodedToken
			next()
			// ...
		})
		.catch(e => {
			// Handle error
			console.error(e.message)
			res.status(401).send()
		})
}

// module.exports = (req, res, next) => {
// 	console.log(JSON.stringify(req.headers))
// 	console.log('here')

// 	admin
// 		.auth()
// 		.verifyIdToken(req.headers.authorization)
// 		.then(function (decodedToken) {
// 			req.claims = decodedToken
// 			next()
// 			// ...
// 		})
// 		.catch(function (e) {
// 			console.error(e.message)
// 			res.status(401).send()
// 		})
// 	next()
// }

// module.exports = async (req, res, next) => {
// 	const decodedToken = await admin
// 		.auth()
// 		.verifyIdToken(req.headers.authorization)
// 	req.claims = decodedToken
// 	const sn = await db.collection('users').doc(decodedToken.user_id).get()
// 	req.user = sn.data()
// 	next()
// }

// module.exports = async (req, res, next) => {
// 	const decodedToken = await admin
// 		.auth()
// 		.verifyIdToken(req.headers.authorization)
// 	req.claims = decodedToken
// 	const sn = await db.collection('users').doc(decodedToken.user_id).get()
// 	req.user = sn.data()
// 	next()
// }

// module.exports = async (req, res, next) => {
// 	const decodedToken = await admin
// 		.auth()
// 		.verifyIdToken(req.headers.authorization)
// 	req.claims = decodedToken
// 	const sn = await db.collection('users').get()
// 	const r = {
// 		items: [],
// 		totalCount: sn.size
// 	}
// 	sn.forEach(v => r.items.push(v.data()))
// 	res.send(r)
// 	next()
// }
