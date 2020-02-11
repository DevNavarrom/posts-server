const Router = require('express');
const UsuarioModel = require("../models/usuario.model");


const rutas = Router();

rutas.get('', function (req, res, next) {
    UsuarioModel.obtenerUsuarios()
        .then(usuarios => {
            res.json({
                'estado': 200,
                'usuarios': usuarios
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo Usuarios... "+err);
        });

});


module.exports = rutas;