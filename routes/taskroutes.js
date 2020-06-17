const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)

router.get('/', TaskController.findAll)

router.get('/:id', TaskController.findOne)

router.post('/', TaskController.addTask)

router.put('/:id', TaskController.updateTask)

router.delete('/:id', 
// authorization, 
TaskController.delete)

module.exports = router