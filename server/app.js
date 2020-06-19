require('dotenv').config()

const express = require('express')
const routes = require('./routes/index')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT 
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)
app.use(errorHandler)

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { 
    console.log('server connected ')
});
server.listen(3000, function() {
    console.log('server is running');
  });

// app.listen(port, () => {
//     console.log(`app listening in port ${port}`)
// })