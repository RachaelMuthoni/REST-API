const router = require('express').Router();


const {home,create,getUsers,getUser,login} = require('../controllers/userController')

router.get('/', home)
router.get('/users',getUsers)
router.get('/user/:email', getUser)

router.post('/login', login)
router.post('/createuser', create)
module.exports = {router};
