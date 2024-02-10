const router = require('express').Router()
const usercontroller = require('../apis/user/userController')

router.post('/login', usercontroller.login)
router.post('/register', usercontroller.register)

module.exports = router