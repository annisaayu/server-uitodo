const router = require('express').Router()
const {listTodo, addTodo, editTodo, deleteTodo, editTask, editBgcolor} = require('../controllers/todo.controller')
const {auth} = require('../middleware/auth');

router.get('/', auth, listTodo)
router.post('/', auth, addTodo)
router.put('/', auth, editTodo)
router.put('/task', auth, editTask)
router.put('/bgColor', auth, editBgcolor)
router.delete('/:id', auth, deleteTodo)

module.exports = router
