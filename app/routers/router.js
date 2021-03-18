const express = require('express')
const router = express.Router()
const app = express()
var bodyParser = require('body-parser')
const customers = require('../controllers/controller.js')
const patients = require('../controllers/paciente.js')
const users = require('../controllers/usuario.js')
const querypacients = require('../controllers/querysPacientes.js')
const menu = require('../controllers/menu.js')
const citas = require('../controllers/citas.js')
const abonos = require('../controllers/abonos.js')
const expediente = require('../controllers/expediente.js')
const tratamiento = require('../controllers/tratamiento.js')
const detalleProcedimiento = require('../controllers/detalle_procedimiento.js')
const detalleEstudiantePaciente = require('../controllers/detalle_usuario_paciente.js')
const soap = require('../controllers/soap.js')
// const { Usuario } = require('../config/db.config.js')

router.post('/api/customers/create', customers.create) // http://localhost:8080/api/customers/create
router.post('/api/customers/createP', customers.createPaciente)
router.get('/api/customers/prueba', ensure_token, customers.prueba)
router.post('/api/queryPaciente/prueba2', querypacients.query)

app.use(express.json({ limit: '100mb' }))
// Login
router.post('/login', customers.login)

// Login Usuarios
router.post('/loginU', customers.loginU)

// Crear Paciente
router.post('/patients/createTrabSocial', patients.createPaciente)
router.post('/patients/createOfiInfo', patients.createPacienteTrab)
router.put('/patients/insertarfotografia/:id', patients.InsertarFotografia)
router.get('/patients/buscarfotografia/:id', patients.buscarFotografia)

// actualizacion contrasenia usuario
router.put('/user/updateContrasenia/:id/:contrasenia', users.updateContrasenia)

// actualizacion contrasenia paciente
router.put('/patients/updateContrasenia/:id/:contrasenia', patients.updateContrasenia)

// Actualizar Paciente
router.post('/patients/update/', patients.updateById)

// Buscar Paciente por DPI
router.post('/patients/search/', patients.filterById)

// Todos los pacientes
router.get('/patients/all/', patients.retrieveAllPatients)

// Registro Estudiantes
router.post('/users/createStudent/', users.createStudent)

// Registro Profesor
router.post('/users/createProfessor/', users.createProfessor)

// Consulta Pacientes con estado 1
router.get('/patients/state0/', patients.PatientsState0)

// Consulta Pacientes con estado 1
router.get('/patients/state1/', patients.PatientsState1)

// Consulta Pacientes con estado 3
router.get('/patients/state3/', patients.PatientsState3)

// Consulta Pacientes con estado 4
router.get('/patients/state4/', patients.PatientsState4)

// Consulta Pacientes con estado 5
router.get('/patients/state5/', patients.PatientsState5)

// Menu
router.post('/menus/', menu.Menus)

// Buscar profesor
router.post('/users/search/', users.filterById)

// Actualizar Profesor
router.post('/users/update/', users.updateById)

// Consulta usuarios estado [2] profesores
router.get('/users/state2/', users.UserState2)

// Consulta usuarios estado [3] estudiantes
router.get('/users/state3/', users.UserState3)

// router.get('/api/customers/all', customers.retrieveAllCustomers)
router.post('/api/customers/onebyid/:id', customers.getCustomerById)

// Citas
router.post('/citas/crear', citas.createCita)

// Citas buscar por paciente
router.get('/citas/consultar/:id', citas.AllCitas)

// Citas buscar por idDPT
router.get('/citas/consultarDPT/:id', citas.AllCitasIdDetalleProcedimiento)

// Citas buscar por paciente fecha
router.get('/citas/consultaridUsuario/:id/:fecha', citas.searchCitasIdUsuario)

// Citas buscar por paciente
router.get('/citas/consultarTodasIdusuario/:id', citas.AllCitasporidUsuario)

// Citas buscar por usuario
router.get('/citas/consultarTodasIdpaciente/:id', citas.AllCitasporidPaciente)

// Eliminar cita
router.delete('/citas/eliminar/:id', citas.deleteCita)

// Abonos
router.post('/abonos/crear', abonos.createAbono)

// Registrar Expediente
router.post('/expediente/crear', expediente.createExpediente)

//  Buscar Expediente por id
router.get('/expediente/search/:id', expediente.filterById)

// Todos Expediente
router.get('/expediente/all/:id', expediente.AllFiles)

// Actualizar Expediente
router.put('/expediente/update/:id', expediente.update)

// Asignacion Profesor Estudiantes
router.post('/asignacion/', users.Asignacion)

// Buscar estudiantes de profesores
router.get('/misestudiantes/:id', users.susEstudiantes)

// Todos los tratamientos
router.get('/tratamiento/', tratamiento.AllFiles)

// Crear Detalle Procedimiento
router.post('/detalleProcedimiento/', detalleProcedimiento.create)

// Buscar Detalle Procedimiento todos
router.get('/buscardetalleProcedimiento/:id', detalleProcedimiento.search)

// Buscar Detalle Procedimiento estado 2
router.get('/buscardetalleProcedimientoEstado2/:id', detalleProcedimiento.searchEstado2)

// Eliminar Detalle Procedimiento
router.delete('/tratamiento/deleteDetalle/:id', detalleProcedimiento.delete)

// Asignacion Estudiante Paciente
router.post('/EstudiantePaciente/asignacion/', detalleEstudiantePaciente.create)

// Buscar Detalle estudiante paciente (por idusuario Estudiante)
router.get('/buscarEstudiante/:id', detalleEstudiantePaciente.searchEstudiante)

// Buscar Detalle estudiante paciente (por idpaciente Paciente)
router.get('/buscarPaciente/:id', detalleEstudiantePaciente.searchPaciente)

// Buscar pacientes de estudiantes
router.get('/buscarPacientesEsutdiantes/:id', detalleEstudiantePaciente.BuscarPacientesParaEstudiantes)

// buscar citas con id usuario
router.get('/citas/buscar/:id', citas.searchCitas)

// CREAR BOLETAS
router.post('/boleta/crear/', soap.generarBoleta)

// CREAR BOLETAS ABONO
router.post('/boleta/crearAbono/', soap.generarBoletaAbono)

// CoNSULTAR BOLETAS
router.get('/boleta/consulta/:id', soap.todosLosPagos)

// CoNSULTAR BOLETAS ABONO
router.get('/boleta/consultaAbono/:id', soap.todosLosPagosAbono)

// CoNSULTAR LA SUMA DE PAGOS BOLETAS
router.get('/boleta/consultaSumPagos/:id', soap.sumaTodosLosPagos)

// CoNSULTAR CREDITO TOTAL
router.get('/boleta/consultaCreditoTotal/:id', soap.totalCredito)

// CONSULTAR BOLETAS
router.get('/boleta/consulta/:idcarnet/:boleta', soap.consultarBoleta)

// ACTUALIZACION ESTADO PACIENTE
router.put('/paciente/estadoactualizacion/:idpaciente', patients.CambioEstado)

// Comprobación boleta paciente
router.get('/Comprobacion/boleta/', patients.PacientesTipo3Comprobacion)

// Actualizar Detalle Procedimiento tratamiento
router.put('/detalleProcedimientoTratamiento/update/:id/:estado', detalleProcedimiento.updateDetalle)

// Buscar Detalle Procedimiento tratamiento idusuario
router.get('/detalleProcedimientoTratamiento/buscar/:id/', detalleProcedimiento.BuscarDetalleProcedimientoIdusuario)

// Buscar pacientes detalle y usuario
router.get('/BuscarDetallePacienteUsuario/:idprofesor', detalleEstudiantePaciente.BuscarDetallePacienteUsuario)

// Update Expediente aprobar_expediente
router.put('/updateExpediente/:id', expediente.updateExpediente)

// Update Expediente diagnostico
router.put('/createDiagnostico/:id', expediente.createDiagnostico)

// Update Expediente aprobar_plan
router.put('/updateExpedientePlan/:id', expediente.updateExpedientePlan)

// Insertar Radiografia
router.put('/insertarRadiografia/:id', expediente.InsertarRadiografia)

// Consultar Radiografia
router.get('/consultarRadiografia/:id', expediente.BuscarRadiografia)

// insertar odontograma
router.put('/insertarOdontograma/:id', expediente.updateOdontograma)

// Bsucar odontograma
router.get('/buscarOdontograma/:id', expediente.buscarOdontograma)

// Consulta de pagos por boleta
router.get('/consultaPagoPorBoleta/:id', soap.consultaPagoPorBoleta)

// Cobros
router.post('/pagos/', soap.cobros)

function ensure_token (req, res, next) {
  // console.log(localStorage.getItem('token'));
  /* if (localStorage.getItem('token') != null) {
        req.token = localStorage.getItem('token');
        next();
    }else{
        res.sendStatus(403);
    } */

  const bearerHeader = req.headers.authorization
  // console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}
module.exports = router
