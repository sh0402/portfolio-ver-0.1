const app = require('express')()
const cors = require('cors')
require('express-async-errors')

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

app.get('/users', async (req, res) => {
	res.send(req.claims)
})

app.use(require('../middlewares/error'))

module.exports = app

// const app = require('express')()
// const cors = require('cors')
// const admin = require('firebase-admin')
// const db = admin.firestore()
// require('express-async-errors')

// app.use(cors({ origin: true }))

// app.use(require('../middlewares/verifyToken'))

// app.get('/users', async (req, res) => {
// 	if (req.claims.level > 0)
// 		return res.status(403).send({
// 			message: 'not authorized'
// 		})
// 	const sn = await db.collection('users').get()
// 	const r = {
// 		items: [],
// 		totalCount: sn.size
// 	}
// 	// const items = []
// 	sn.forEach(v => r.items.push(v.data()))
// 	res.send(r)
// 	res.send(sn.data)
// })

// app.use(require('../middlewares/error'))

// module.exports = app
