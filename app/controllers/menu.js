const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Menu = db.Menu

exports.Menus = (req, res) => {
  const tipmenu = req.body.tipomenu
  Menu.findOne({
    attributes: ['nombre', 'descripcion', 'url'],
    where: { tipousuario: tipmenu }
  }).then(results => {
    console.log(results)
    var menus = { usuario: results.dataValues.nombre, nombre: results.dataValues.descripcion, apellidos: results.dataValues.url }
    res.status(200).json({
      paciente: menus
    })
  })
}
