const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Abono = db.Abono

exports.createAbono = (req, res) => {
  const abono = {}
  try {
    abono.idpaciente = req.body.idpaciente
    abono.monto = req.body.monto
    /*Abono.create(abono).then(result => {
        res.status(200).json({
          message: 'abono creada con el ID = ' + result.idpaciente,
          paciente: result
        })
      })*/
    res.status(200).json({
        message: 'abono creada con el ID = ' + abono.idpaciente,
        paciente: abono
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}
