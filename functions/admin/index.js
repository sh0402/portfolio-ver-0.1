const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin')
require('express-async-errors')

const db = admin.firestore()

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

app.use((req, res, next) => {
	// if (req.claims.level === undefined)
	// 	return res.status(403).send({ message: 'not authorized' })

	if (req.claims.level > 0)
		return res.status(403).send({ message: 'not authorized' })
	next()
})

app.get('/users', async (req, res) => {
	let { offset, limit, order, sort, search } = req.query
	offset = Number(offset)
	limit = Number(limit)
	const r = {
		items: [],
		totalCount: 0
	}
	let sn = null
	if (search) {
		sn = await db.collection('users').where('email', '==', search).get()
		r.totalCount = sn.size
	} else {
		const t = await db.collection('infos').doc('users').get()
		r.totalCount = t.data().counter
		sn = await db
			.collection('users')
			.orderBy(order, sort)
			.offset(offset)
			.limit(limit)
			.get()
	}
	sn.forEach(v => {
		r.items.push(v.data())
	})
	res.send(r)
})

app.get('/users2', async (req, res) => {
	let { offset, limit, order, sort, search } = req.query
	offset = Number(offset)
	limit = Number(limit)
	const r = {
		items: [],
		totalCount: 0
	}
	let sn = null
	if (search) {
		sn = await db.collection('users').where('email', '==', search).get()
		r.totalCount = sn.size
	} else {
		const t = await db.collection('infos').doc('users').get()
		r.totalCount = t.data().counter
		sn = await db
			.collection('users')
			.orderBy(order, sort)
			.offset(offset)
			.limit(limit)
			.get()
	}
	sn.forEach(v => {
		r.items.push(v.data())
	})
	res.send(r)
})

app.get('/search', async (req, res) => {
	const sn = await db
		.collection('users')
		.where('email', '>=', req.query.search)
		.limit(3)
		.get()
	const items = []
	sn.forEach(v => {
		items.push(v.data().email)
	})
	res.send(items)
})

// app.get('/search', async (req, res) => {
// 	const sn = await db
// 		.collection('users')
// 		.where('email', '>=', req.query.search)
// 		.limit(3)
// 		.get()

// 	const items = []
// 	sn.forEach(v => {
// 		items.push(v.data().email)
// 	})
// 	res.send(items)
// })

app.patch('/user/:uid/level', async (req, res) => {
	if (!req.params.uid) return res.status(400).end()
	if (req.body.level === undefined) return res.status(400).end()
	const uid = req.params.uid
	const level = req.body.level

	const claims = { level }
	await admin.auth().setCustomUserClaims(uid, claims)
	await db.collection('users').doc(uid).update(claims)

	res.status(200).end()
})

app.use(require('../middlewares/error'))

module.exports = app
