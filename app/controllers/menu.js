const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Menu = db.Menu

exports.Menus = (req, res) => {
  const tipmenu = req.body.tipomenu
  Menu.findAll({
    attributes: ['nombre', 'descripcion', 'url'],
    where: { tipousuario: tipmenu }
  }).then(results => {
    // console.log(results)
    // res.writeHead(200, { 'Contenet-Type': 'text/html;charset=UTF-8' })
    var object = JSON.parse(results.toString('utf8'))
    var obj = JSON.parse(object)
    res.status(200).json({
      Menus: obj
    })
  })
    . catch(error => {
    // console.log(error)
      res.status(500).json({
        message: 'No hay Menus',
        error: error
      })
    })
}
