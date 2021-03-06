module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define('menu', {
    idmenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    tipousuario: {
      type: Sequelize.INTEGER
    }

  })
  return Menu
}
