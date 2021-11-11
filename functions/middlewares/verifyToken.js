const admin = require('firebase-admin')

module.exports = (req, res, next) => {
	console.log(JSON.stringify(req.headers))
	console.log('here')

	admin
		.auth()
		.verifyIdToken(req.headers.authorization)
		.then(decodedToken => {
			req.claims = decodedToken
			next()
			// ...
		})
		.catch(function (e) {
			// Handle error
			console.error(e.message)
			res.status(401).send()
		})
	next()
}
