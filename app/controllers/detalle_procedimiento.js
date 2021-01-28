const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Detalle_procedimiento = db.Detalle_procedimiento
const Expediente = db.Expediente
const Tratamiento = db.Tratamiento
const { QueryTypes } = require('sequelize')

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

exports.search = async (req, res) => {
  const id = req.params.id
  await db.sequelize.query(
    `select * from detalle_procedimiento_tratamientos as dpt
    inner join tratamientos as t on dpt.idtratamiento = t.idtratamiento
    where dpt.idexpediente = ?;`,
    {
      replacements: [id],
      type: QueryTypes.SELECT
    }
  )
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
