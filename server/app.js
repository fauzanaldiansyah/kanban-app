if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
  const morgan = require('morgan')
}

const express = require('express')
const routes = require('./routes/index')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`app listening in port ${port}`)
})