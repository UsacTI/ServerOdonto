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
    var menus = { nombre: results.dataValues.nombre, descripcion: results.dataValues.descripcion, url: results.dataValues.url }
    res.status(200).json({
      Menus: menus
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
