const db = require('../config/db.config')
const Cita = db.Cita
const { QueryTypes } = require('sequelize')
const request = require('request-promise')

exports.createCita = (req, res) => {
  const cita = {}
  try {
    cita.idpaciente = req.body.idpaciente
    cita.id_detalle_procedimiento_tratamiento = req.body.id_detalle_procedimiento_tratamiento
    cita.fecha = req.body.fecha
    cita.doctor = req.body.doctor
    cita.hora = req.body.hora
    Cita.create(cita).then(result => {
      const ruta = `http://detalleProcedimientoTratamiento/update/${req.body.id_detalle_procedimiento_tratamiento}/${3}`
      try {
        request({
          uri: ruta,
          json: true
        }).then(datos => {
          console.log('Actualización realizada')
        })
      } catch (error) {
        res.status(200).json({
          message: 'Fail!',
          error: error.message
        })
      }
      res.status(200).json({
        message: 'Cita creada con el ID = ' + result.idpaciente,
        citas: result
      })
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
        message: 'No se encontró la cita con ID usuario =' + id,
        error: error
      })
    })
}

exports.AllCitas = (req, res) => {
  const idpaciente = req.params.id
  Cita.findAll({
    where: { idpaciente: idpaciente }
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

exports.AllCitasFecha = (req, res) => {
  const fecha = req.params.id
  console.log(fecha)
  Cita.findAll({
    where: { fecha: String(fecha) }
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

exports.searchCitasIdUsuario = async (req, res) => {
  const idus = req.params.id
  const fecha = req.params.fecha
  await db.sequelize.query(
    `select * from citas as c 
    inner join detalle_procedimiento_tratamientos as dpt on dpt.id_detalle_procedimiento_tratamiento = c.id_detalle_procedimiento_tratamiento
    inner join tratamientos as t on t.idtratamiento = dpt.idtratamiento
    where dpt.idusuario = ? and c.fecha= ?;`,
    {
      replacements: [idus, fecha],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Citas con con ID usuario = ' + idus,
        citas: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró la cita con ID usuario =' + idus,
        error: error
      })
    })
}

exports.AllCitasporidUsuario = async (req, res) => {
  const idus = req.params.id
  await db.sequelize.query(
    `select * from citas as c 
    inner join detalle_procedimiento_tratamientos as dpt on dpt.id_detalle_procedimiento_tratamiento = c.id_detalle_procedimiento_tratamiento
    inner join tratamientos as t on t.idtratamiento = dpt.idtratamiento
    inner join pacientes as p on p.idpaciente = c.idpaciente
    where dpt.idusuario = ? ;`,
    {
      replacements: [idus],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Citas con con ID usuario = ' + idus,
        citas: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró la cita con ID usuario =' + idus,
        error: error
      })
    })
}

exports.AllCitasporidPaciente = async (req, res) => {
  const idus = req.params.id
  await db.sequelize.query(
    `select * from citas as c 
    inner join detalle_procedimiento_tratamientos as dpt on dpt.id_detalle_procedimiento_tratamiento = c.id_detalle_procedimiento_tratamiento
    inner join tratamientos as t on t.idtratamiento = dpt.idtratamiento
    inner join pacientes as p on p.idpaciente = c.idpaciente
    where c.idpaciente = ? ;`,
    {
      replacements: [idus],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Citas con con ID usuario = ' + idus,
        citas: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró la cita con ID usuario =' + idus,
        error: error
      })
    })
}
