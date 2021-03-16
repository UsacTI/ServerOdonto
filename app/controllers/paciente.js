const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const { QueryTypes } = require('sequelize')
const request = require('request-promise')
const Paciente = db.Paciente
const formidable = require('formidable')
var fs = require('fs')
// const { Usuario } = require('../config/db.config')
var año = (new Date()).getFullYear()
var mes = (new Date()).getMonth()
var dia = (new Date()).getDate()

/*
Estados:
  0 = Paciente registrado por oficina informacion
  1 = Paciente registrado por oficina trabajo social
  3 = Pendiente de pago de boleta de primera cita
  4 = Boleta pagada primera cita / listo para asignar a estudiante / aparece en banco pacientes
  5 = Paciente Asignado
  6 = Paciente tratamiento
  */
exports.createPaciente = (req, res) => {
  const paciente = {}
  try {
    paciente.nombres = req.body.nombres
    paciente.apellidos = req.body.apellidos
    paciente.genero = req.body.genero
    paciente.nacimiento = req.body.nacimiento
    paciente.dpi = req.body.dpi
    paciente.contrasenia = req.body.contrasenia
    paciente.direccion = req.body.direccion
    paciente.telefono = req.body.telefono
    paciente.nohijos = req.body.nohijos
    paciente.escolaridad = req.body.escolaridad
    paciente.nivel = req.body.nivel
    paciente.profesion = req.body.profesion
    paciente.nacionalidad = req.body.nacionalidad
    paciente.transporte = req.body.transporte
    paciente.tipopaciente = req.body.tipopaciente
    paciente.consulta = req.body.consulta
    paciente.doctor = req.body.doctor
    paciente.correo = req.body.correo
    paciente.aprobacion = 1

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = 'PI' + c + dia + mes + año
        // Save to MySQL database
        // console.log(paciente)
        Paciente.create(paciente).then(result => {
          res.status(200).json({
            message: 'Paciente creado con el ID = ' + result.idpaciente,
            paciente: result
          })
        })
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.createPacienteTrab = (req, res) => {
  const paciente = {}
  try {
    paciente.nombres = req.body.nombres
    paciente.apellidos = req.body.apellidos
    paciente.genero = req.body.genero
    paciente.nacimiento = req.body.nacimiento
    paciente.dpi = req.body.dpi
    paciente.contrasenia = req.body.contrasenia
    paciente.direccion = req.body.direccion
    paciente.telefono = req.body.telefono
    paciente.consulta = req.body.consulta
    paciente.correo = req.body.correo
    paciente.tipopaciente = 5 // no clasificado
    paciente.aprobacion = 0

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = req.body.dpi
        // Save to MySQL database
        Paciente.create(paciente).then(result => {
          res.status(200).json({
            message: 'Paciente creado con el ID = ' + result.idpaciente,
            paciente: result
          })
        })
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.InsertarFotografia = async (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    // console.log(files.images.path)
    // for (const file of Object.entries(files)) {
    //   console.log(file)
    // }

    var idexpediente = req.params.id

    var bitmap = fs.readFileSync(files.images.path)
    var base64 = new Buffer(bitmap).toString('base64')

    await db.sequelize.query(
      `update pacientes
    set fotografia = ?
    where idpaciente = ?;`,
      {
        replacements: [base64, idexpediente],
        type: QueryTypes.SELECT
      }
    )
      .then(results => {
        res.status(200).json({
          message: 'Paciente con Fotografia con ID = ' + idexpediente,
          foto: results
        })
      })
      .catch(error => {
        // console.log(error)
        res.status(500).json({
          message: 'No se encontró el Paciente ID =' + idexpediente,
          error: error
        })
      })
  })
}

exports.buscarFotografia = (req, res) => {
  const id = req.params.id
  Paciente.findOne({
    where: { idpaciente: id },
    attributes: ['fotografia']
  })
    .then(results => {
      res.status(200).json({
        message: 'Paciente con ID = ' + id,
        expediente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Paciente con ID =' + id,
        error: error
      })
    })
}

exports.updateById = async (req, res) => {
  try {
    const idus = req.body.id
    console.log('--------------------------> ' + req.body.tipopaciente)
    console.log(idus)
    const paciente = await Paciente.findOne({ where: { idpaciente: idus } })
    // console.log(paciente)
    if (!paciente) {
      // return a response to client
      res.status(404).json({
        message: 'No se ha encontrado el paciente con ID = ' + idus,
        customer: '',
        error: '404'
      })
    } else {
      const updatedObject = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        dpi: req.body.cui,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        nohijos: (req.body.nohijos === '' ? 0 : req.body.nohijos),
        escolaridad: (req.body.escolaridad === '' ? '' : req.body.escolaridad),
        nivel: (req.body.nivel === '' ? '' : req.body.nivel),
        profesion: (req.body.trauoficio === '' ? '' : req.body.trauoficio),
        transporte: (req.body.transporte === '' ? 'otro' : req.body.transporte),
        doctor: (req.body.doctor === '' ? '' : req.body.doctor),
        consulta: (req.body.consulta === '' ? '' : req.body.consulta),
        tipopaciente: (req.body.tipopaciente === '' ? '' : req.body.tipopaciente),
        correo: req.body.correo,
        aprobacion: 1,
        nacionalidad: (req.body.nacionalidad === '' ? '' : req.body.nacionalidad)
      }
      console.log(updatedObject)
      const result = await Paciente.update(updatedObject, { returning: true, where: { idpaciente: idus } })
      if (!result) {
        res.status(500).json({
          message: 'No se pudo actualizar el paciente con No.DPI = ' + req.params.dpi,
          error: 'No se actualizó'
        })
      }

      // res.status(200).json({
      //   message: 'Actualización correcta [' + idus + ']',
      //   customer: updatedObject
      // })
    }
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el paciente con No.idus = ' + req.body.id,
      error: error.message
    })
  }
}

exports.filterById = (req, res) => {
  const id = req.body.id
  Paciente.findOne({
    where: { idpaciente: id }
  })
    .then(results => {
      res.status(200).json({
        message: 'Paciente con ID = ' + id,
        paciente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Paciente con ID =' + id,
        error: error
      })
    })
}

exports.retrieveAllPatients = (req, res) => {
  Paciente.findAll()
    .then(PatientsInfo => {
      res.status(200).json({
        message: 'Todos los Pacientes',
        pacientes: PatientsInfo
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No hay Pacientes',
        error: error
      })
    })
}

exports.PatientsState1 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 1 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.PatientsState0 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 0 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.PatientsState3 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 3 }
  }).then(results => {
    // console.log(results)
    // results.forEach(element => {
    //   console.log(element.dataValues)
    //   var dpi = element.dataValues.dpi
    // })

    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.PacientesTipo3Comprobacion = async (req, res) => {
  await db.sequelize.query(
    `select p.idboleta, p.monto, p.estado, p.tipo, pa.idpaciente from pagos as p
    inner join pacientes as pa 
    on pa.idpaciente = p.idpaciente
    where p.estado = 1 
    and p.tipo = 0 
    and pa.aprobacion = 3;`
  )
    .then(results => {
      // console.log(results)
      if (results[0].length !== 0) {
        results[0].forEach(element => {
          console.log(element.idboleta + ' ---- ' + element.idpaciente)
          const ruta = `http://localhost:8080/boleta/consulta/${element.idpaciente}/${element.idboleta}`
          // const ruta = 'http://localhost:8080/boleta/consulta/201105846/11029859'
          try {
            request({
              uri: ruta,
              json: true
            }).then(usuarios => {
              var result = JSON.parse(usuarios)
              // console.log('-------------' + result.DESCRIPCION2)
              if (result.DESCRIPCION2 === 'PAGADA') {
                // console.log('Si esta pagada')
                const updatedObject = {
                  aprobacion: 4
                }
                const result = Paciente.update(updatedObject, { returning: true, where: { idpaciente: element.idpaciente } })
                if (!result) {
                  res.status(500).json({
                    message: 'No se pudo actualizar el paciente con ID = ' + element.idpaciente,
                    error: 'No se actualizó'
                  })
                }
                res.status(200).json({
                  message: 'Actualización correcta del paciente ID = [' + element.idpaciente + ']',
                  boleta: updatedObject
                })
              } else {
                res.status(200).json({
                  message: 'No ha pagado paciente ID = [' + element.idpaciente + ']'
                })
              }
            })
          } catch (error) {
            res.status(200).json({
              message: 'Fail!',
              error: error.message
            })
          }
        })
      } else {
        res.status(200).json({
          message: 'Los registros para actualizar'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'No se encontró la cita con ID usuario =',
        error: error
      })
    })
}

exports.PatientsState4 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 4 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.PatientsState5 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 5 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.CambioEstado = async (req, res) => {
  try {
    const id = req.params.idpaciente
    const estado = req.body.estado
    const updatedObject = {
      aprobacion: estado
    }
    const result = await Paciente.update(updatedObject, { returning: true, where: { idpaciente: id } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar el paciente con ID = ' + id,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta [' + id + ']',
      paciente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el paciente con ID = ' + req.params.idpaciente,
      error: error.message
    })
  }
}

exports.updateContrasenia = (req, res) => {
  var id = req.params.id
  bcrypt.hash(req.params.contrasenia, saltRounds).then(async function (hash) {
    const updatedObject = {
      contrasenia: hash
    }
    const result = await Paciente.update(updatedObject, { returning: true, where: { idpaciente: id } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar el paciente con ID = ' + id,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta [' + id + ']',
      customer: updatedObject
    })
  })
}
