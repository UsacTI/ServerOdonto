module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('paciente', {
    idusuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    carnet: {
      type: Sequelize.INTEGER
    },
    dpi: {
      type: Sequelize.STRING
    },
    nombres: {
      type: Sequelize.STRING
    },
    apellidos: {
      type: Sequelize.STRING
    },
    nacimiento: {
      type: Sequelize.DATE
    },
    genero: {
      type: Sequelize.INTEGER
    },
    telefono: {
      type: Sequelize.INTEGER
    },
    contrasenia: {
      type: Sequelize.STRING
    },
    tipousuario: {
      type: Sequelize.INTEGER
    },
    usuarios_idusuario: {
      type: Sequelize.INTEGER
    }
  })

  return Usuario
}