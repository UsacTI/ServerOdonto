//const {LocalStorage} = require('node-localstorage')
//localStorage = new LocalStorage('./scratch')
let express = require('express')
let router = express.Router()

const customers = require('../controllers/controller.js')

router.post('/api/customers/create', customers.create) // http://localhost:8080/api/customers/create
router.post('/api/customers/createP', customers.createPaciente)
router.post('/api/customers/login', customers.login)
router.get('/api/customers/prueba', ensure_token, customers.prueba)

// router.get('/api/customers/all', customers.retrieveAllCustomers)
router.post('/api/customers/onebyid/:id', customers.getCustomerById)

// router.get('/api/customers/pagination', customers.pagination)
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting)
// router.put('/api/customers/update/:id', customers.updateById)
// router.delete('/api/customers/delete/:id', customers.deleteById)

function ensure_token(req, res, next) {
    //console.log(localStorage.getItem('token'));
    /*if (localStorage.getItem('token') != null) {
        req.token = localStorage.getItem('token');
        next();
    }else{
        res.sendStatus(403);
    }*/
    
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}


module.exports = router
