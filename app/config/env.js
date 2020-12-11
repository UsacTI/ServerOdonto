const env = {
  database: 'postgres',
  username: 'odontousac',
  password: 'odontousac',
  host: '10.0.0.127',
  dialect: 'postgres',
  pool: {
    max: 20, // Número máximo de conexiones
    min: 0,
    acquire: 30000, // tiempo máximo, en milisegundos, que el grupo intentará conectarse antes de lanzar el error
    idle: 10000 // tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
  }
}

module.exports = env
