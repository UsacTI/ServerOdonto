module.exports = (sequelize, Sequelize) => {
  const DetalleUsPa = sequelize.define('pago', {
    idpago: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idboleta: {
      type: Sequelize.INTEGER
    },
    idpaciente: {
      type: Sequelize.INTEGER
    },
    monto: {
      type: Sequelize.FLOAT
    },
    estado: {
      type: Sequelize.INTEGER
    },
    tipo: {
      type: Sequelize.INTEGER
    },
    fecha: {
      type: Sequelize.DATE
    },
    descripcion: {
      type: Sequelize.STRING
    }
  }
  )
  return DetalleUsPa
}
