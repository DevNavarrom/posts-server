const Servidor = require('./server/server');
const rutasUsuarios = require('./routes/usuario.router');

const servidor = new Servidor().getInstancia();

servidor.agregarRutas([
    { 'rutaRaiz': '/usuarios', 'enrutador': rutasUsuarios }
]);

servidor.iniciar( () => console.log(`Servidor corriendo en el puerto ${ servidor.puerto }`) );
