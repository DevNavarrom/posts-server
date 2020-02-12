const Router = require('express');
const UsuarioModel = require("../models/usuario.model");


const rutas = Router();

rutas.get('', function (req, res, next) {
    UsuarioModel.obtenerUsuarios()
        .then(usuarios => {
            res.json({
                'estado': 'Ok',
                'usuarios': usuarios
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo Usuarios... "+err);
        });

});


rutas.post('', (req, res) => {

    UsuarioModel.insertarUsuario(req.body).then(res => {
        if (res) {
            res.json({
                'estado': OK,
                'mensaje': 'Usuario insertado'
            });
        } else {
            res.json({
                'estado': ERROR,
                'error': 'No se insertó el usuario'
            });
        }
    }).catch(err => {
        return res.status(500).send("Error insertando Usuario... "+err);
    });
});


module.exports = rutas;