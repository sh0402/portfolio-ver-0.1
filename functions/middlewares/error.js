module.exports = (err, req, res) => {
	if (err.message === 'abc') return res.status(403).send('auth failed')
	res.send(err.message)
}
