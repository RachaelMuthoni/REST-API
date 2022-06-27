const router = require('express').Router();


const {home,getUser,getUsers,login} = require('../controllers/userController')

router.get('/', home)
router.get('/users',getUsers)
router.get('/user/:email', getUser)

router.post('/login', login)

module.exports = {router};
