module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuario', {
    idusuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    carne: {
      type: Sequelize.STRING
    },
    cui: {
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
      type: Sequelize.STRING
    },
    contrasenia: {
      type: Sequelize.STRING
    },
    tipousuario: {
      type: Sequelize.INTEGER
    },
    area: {
      type: Sequelize.STRING
    },
    subarea: {
      type: Sequelize.STRING
    },
    usuarios_idusuario: {
      type: Sequelize.INTEGER
    }
  })

  return Usuario
}