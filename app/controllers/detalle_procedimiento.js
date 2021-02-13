const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Detalle_procedimiento = db.Detalle_procedimiento
// const Expediente = db.Expediente
// const Tratamiento = db.Tratamiento
const { QueryTypes } = require('sequelize')

/*
Estados:
  0: Registrado
  1: Solicitud de aprobación al profesor
  2: Aprobado Listo para la cita
  3: Cita creada / listo para cobrar
  4: Tratamiento cobrado
  5: Tratamiento hecho y aprobado
*/

exports.create = (req, res) => {
  const detalle = {}
  try {
    detalle.idtratamiento = req.body.idtratamiento
    detalle.idexpediente = req.body.idexpediente
    detalle.idusuario = req.body.idusuario
    detalle.pieza = req.body.pieza
    detalle.estado = 0
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

exports.delete = (req, res) => {
  const id = req.params.id
  Detalle_procedimiento.destroy({
    where: { id_detalle_procedimiento_tratamiento: id }
  }).then(results => {
    res.status(200).json({
      detalle: results
    })
  }).catch(error => {
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.updateDetalle = async (req, res) => {
  var iddetalleProcTrata = req.params.id
  var estado = req.params.estado
  try {
    const updatedObject = {
      estado: estado
    }
    const result = await Detalle_procedimiento.update(updatedObject, { returning: true, where: { id_detalle_procedimiento_tratamiento: iddetalleProcTrata } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + iddetalleProcTrata,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + iddetalleProcTrata + ']',
      expediente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + iddetalleProcTrata,
      error: error.message
    })
  }
}

exports.BuscarDetalleProcedimientoIdusuario = async (req, res) => {
  const idusuario = req.params.id
  Detalle_procedimiento.findAll({
    where: { idusuario: idusuario }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      cita: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}
