const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const db = require('./app/config/db.config.js')

// force: true, soltará la tabla si ya existe
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync with { force: true }')
// })

const router = require('./app/routers/router.js')

const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
// app.use(cors({ origin: '*' }))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
//   next()
// })

app.use(bodyParser.json())
app.use(express.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000000 }))
app.use('/', router)

// Create a Server
const server = app.listen(8080, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('http://%s:%s', host, port)
})
