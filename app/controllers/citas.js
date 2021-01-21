const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Cita = db.Cita
var año = (new Date()).getFullYear()
var mes = (new Date()).getMonth()
var dia = (new Date()).getDate()

exports.createCita = (req, res) => {
  const cita = {}
  try {
    cita.idpaciente = req.body.idpaciente
    cita.tratamiento = req.body.tratamiento
    cita.fecha = req.body.fecha
    
    /*Cita.create(cita).then(result => {
        res.status(200).json({
          message: 'Cita creada con el ID = ' + result.idpaciente,
          paciente: result
        })
      })*/
    res.status(200).json({
        message: 'Cita creada con el ID = ' + cita.idpaciente,
        paciente: cita
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}
