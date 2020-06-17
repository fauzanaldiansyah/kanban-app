require('dotenv').config()

const express = require('express')
const routes = require('./routes/index')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`app listening in port ${port}`)
})