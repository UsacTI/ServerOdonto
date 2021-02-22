const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Detalle_usu_paciente = db.Detalle_Usuario_paciente
const Paciente = db.Paciente
const { QueryTypes } = require('sequelize')

/*
  Estados:
  0: Registrado
  1: 
  2:
  3:
  4: es pagado
  5: solicitar aprobación
  6: aprobado
*/

exports.create = (req, res) => {
  const detalle = {}
  try {
    detalle.estado = 1
    detalle.idusuario = req.body.idusuario
    detalle.idpaciente = req.body.idpaciente
    Detalle_usu_paciente.create(detalle)
      .then(result => {
        const updatedObject = {
          aprobacion: 5
        }
        const result2 = Paciente.update(updatedObject, { returning: true, where: { idpaciente: req.body.idpaciente } })
        if (!result2) {
          res.status(500).json({
            message: 'No se pudo actualizar el paciente con ID = ' + req.body.idpaciente,
            error: 'No se actualizó'
          })
        }
        res.status(200).json({
          message: 'Detalle Usuario Paciente creado correctamente =  [' + req.body.idpaciente + ']',
          boleta: updatedObject
        })
      })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.searchEstudiante = (req, res) => {
  const id = req.params.id
  // console.log(id)
  Detalle_usu_paciente.findAll({
    where: { idusuario: id }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      detalleestudiantepaciente: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.searchPaciente = (req, res) => {
  const id = req.params.id
  Detalle_usu_paciente.findAll({
    where: { idpaciente: id }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      detalleestudiantepaciente: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.BuscarPacientesParaEstudiantes = async (req, res) => {
  const id = req.params.id
  await db.sequelize.query(
    `select pa.idpaciente, pa.nombres, pa.apellidos, pa.dpi, ex.aprobar_expediente, ex.aprobar_plan, ex.idexpediente, pa.fotografia, pa.telefono, pa.escolaridad, pa.profesion
    from pacientes as pa 
	  inner join detalle_usuario_pacientes as dup on dup.idpaciente =  pa.idpaciente
	  left join expedientes as ex on ex.idpaciente = pa.idpaciente
    where dup.idusuario = ?;`,
    {
      replacements: [id],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Detalle Procedimiento con ID = ' + id,
        pacientes: results
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'No se encontró el Detalle Procedimiento con ID =' + id,
        error: error
      })
    })
}

exports.BuscarDetallePacienteUsuario = async (req, res) => {
  const idprofesor = req.params.idprofesor
  await db.sequelize.query(
    `select us.idusuario, p.idpaciente, p.nombres, p.apellidos, us.nombres as "nombresUs", us.apellidos as "apellidoUs", ex.aprobar_expediente, ex.aprobar_plan, ex.idexpediente, p.fotografia, p.telefono, p.escolaridad, p.profesion, p.dpi, p.idpaciente
    from usuarios as us
    inner join detalle_usuario_pacientes as dup on dup.idusuario = us.idusuario
    inner join pacientes as p on p.idpaciente = dup.idpaciente
    inner join expedientes as ex on ex.idpaciente = dup.idpaciente
    where us.usuarios_idusuario = ?`,
    {
      replacements: [idprofesor],
      type: QueryTypes.SELECT
    }
  )
    .then(results => {
      res.status(200).json({
        message: 'Encargado idprofesor = ' + idprofesor,
        detalle: results
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erro, no existe el Idprofesor =' + idprofesor,
        error: error
      })
    })
}
