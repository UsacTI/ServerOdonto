module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define('detalle_procedimiento_tratamiento', {
    id_detalle_procedimiento_tratamiento: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idtratamiento: {
      type: Sequelize.INTEGER
    },
    idexpediente: {
      type: Sequelize.INTEGER
    },
    idusuario: {
      type: Sequelize.INTEGER
    },
    pieza: {
      type: Sequelize.INTEGER
    }
  }
  )
  return Menu
}
