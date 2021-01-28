module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define('tratamiento', {
    idtratamiento: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: Sequelize.STRING
    },
    valor: {
      type: Sequelize.INTEGER
    },
    clasificacion: {
      type: Sequelize.INTEGER
    }
  }
  )
  return Menu
}
