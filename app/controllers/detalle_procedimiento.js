const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Detalle_procedimiento = db.Detalle_procedimiento
const Expediente = db.Expediente
const Tratamiento = db.Tratamiento

exports.create = (req, res) => {
  const detalle = {}
  try {
    detalle.idtratamiento = req.body.idtratamiento
    detalle.idexpediente = req.body.idexpediente
    detalle.idusuario = req.body.idusuario
    detalle.pieza = req.body.pieza
    Detalle_procedimiento.create(detalle).then(result => {
      res.status(200).json({
        message: 'Detalle Procedimiento creado correctamente = ' + result.id_detalle_procedimiento_tratamiento,
        tratamientos: result
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.search = (req, res) => {
  const id = req.params.id
  Detalle_procedimiento.findAll({
    // where: { idexpediente: id }
    include: [
      { model: Tratamiento },
      { model: Detalle_procedimiento }
    ],
    attributes: ['idtratamiento']
  })
    .then(results => {
      res.status(200).json({
        message: 'Detalle Procedimiento con ID = ' + id,
        tratamientos: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Detalle Procedimiento con ID =' + id,
        error: error
      })
    })
}
