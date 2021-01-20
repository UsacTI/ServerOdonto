const env = require('./env.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Customer = require('../models/customer.model.js')(sequelize, Sequelize)
db.Paciente = require('../models/paciente.model.js')(sequelize, Sequelize)
db.Usuario = require('../models/usuario.model.js')(sequelize, Sequelize)
db.Cita = require('../models/cita.model.js')(sequelize, Sequelize)
db.Abono = require('../models/abono.model.js')(sequelize, Sequelize)

module.exports = db
