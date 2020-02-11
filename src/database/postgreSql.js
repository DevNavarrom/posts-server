
const { Client } = require('pg')
//DB User = postgres
//DB Passw = brasileno921202
//DB Name = dbposts
const connectionString = 'postgresql://postgres:brasileno921202@localhost:5432/dbposts'

class PostgreSql {

  constructor() {
      this.conexion = new Client({
        connectionString: connectionString,
    });

      this.conexion.connect( err => {
          if (err) {
              console.log('Error en la conexión de la base de datos', err);
              return;
          }

          console.log('Base de datos conectada correctamente');
      });
  }

  query(sql, args) {
      return new Promise( (resolve, reject) => {
          this.conexion.query(sql, args, (error, filas) => {
              if (error) return reject(error);

              resolve(filas);
          });
      });
  }

  close() {
      return new Promise( (resolve, reject) => {
          this.conexion.end( err => {
              if (err) return reject(error);

              resolve();
          });
      });
  }
}

class Singleton {
  constructor() {
      if ( !Singleton.instancia ) {
          Singleton.instancia = new PostgreSql();
      }
  }

  getInstancia() {
      return Singleton.instancia;
  }
}

module.exports = Singleton;
