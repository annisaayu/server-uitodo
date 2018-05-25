const router = require('express').Router()
const {homepage, signin, signup, loginFb} = require('../controllers/index.controller')

router.get('/', homepage)
router.post('/signin', signin)
router.get('/loginFb', loginFb)
router.post('/signup', signup)

module.exports = router
