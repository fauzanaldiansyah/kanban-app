const router = require('express').Router()
const userroutes = require('./userroutes.js')
const taskroutes = require('./taskroutes.js')

router.get ('/', (req,res) => { 
    res.json({msg:"Hello KANBAN!"})
})

router.use('/users', userroutes)

router.use('/tasks', taskroutes)

module.exports = router