const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Cita = db.Cita
const { QueryTypes } = require('sequelize')

exports.createCita = (req, res) => {
  const cita = {}
  try {
    cita.idpaciente = req.body.idpaciente
    cita.tratamiento = req.body.tratamiento
    cita.fecha = req.body.fecha
    Cita.create(cita).then(result => {
      res.status(200).json({
        message: 'Cita creada con el ID = ' + result.idpaciente,
        citas: result
      })
    })
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

exports.searchCitas = async (req, res) => {
  const id = req.params.id
  await db.sequelize.query(
    `select * from citas as ci
    inner join detalle_procedimiento_tratamientos as dpt
    on
    ci.id_detalle_procedimiento_tratamiento = dpt.id_detalle_procedimiento_tratamiento 
    where dpt.idusuario = ?;`,
    {
      replacements: [id],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Citas con con ID usuario = ' + id,
        citas: results
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