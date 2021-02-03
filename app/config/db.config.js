const env = require('./env.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
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
db.Menu = require('../models/menu.model.js')(sequelize, Sequelize)
db.Cita = require('../models/cita.model.js')(sequelize, Sequelize)
db.Abono = require('../models/abono.model.js')(sequelize, Sequelize)
db.Expediente = require('../models/expediente.model')(sequelize, Sequelize)
db.Tratamiento = require('../models/tratamiento.model')(sequelize, Sequelize)
db.Detalle_procedimiento = require('../models/detalle_procedimiento_tratamiento.model')(sequelize, Sequelize)
db.Detalle_Usuario_paciente = require('../models/detalle_usuario_pacientes.model')(sequelize, Sequelize)
db.Pago = require('../models/pago.model')(sequelize, Sequelize)
module.exports = db
