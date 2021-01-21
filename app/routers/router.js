const express = require('express')
const router = express.Router()

const customers = require('../controllers/controller.js')
const patients = require('../controllers/paciente.js')
const users = require('../controllers/usuario.js')
const querypacients = require('../controllers/querysPacientes.js')
const menu = require('../controllers/menu.js')
const citas = require('../controllers/citas.js')
const abonos = require('../controllers/abonos.js')

router.post('/api/customers/create', customers.create) // http://localhost:8080/api/customers/create
router.post('/api/customers/createP', customers.createPaciente)
router.get('/api/customers/prueba', ensure_token, customers.prueba)
router.post('/api/queryPaciente/prueba2', querypacients.query)

// Login
router.post('/login', customers.login)

// Login Usuarios
router.post('/loginU', customers.loginU)

// Crear Paciente
router.post('/patients/createTrabSocial', patients.createPaciente)
router.post('/patients/createOfiInfo', patients.createPacienteTrab)

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
router.get('/patients/state1/', patients.PatientsState1)

// Menu
router.post('/menus/', menu.Menus)

// Buscar profesor
router.post('/users/search/', users.filterById)

// Actualizar Profesor
router.post('/users/update/', users.updateById)

// router.get('/api/customers/all', customers.retrieveAllCustomers)
router.post('/api/customers/onebyid/:id', customers.getCustomerById)

//Citas
router.post('/citas/crear', citas.createCita)

//Abonos
router.post('/abonos/crear', abonos.createAbono)

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
