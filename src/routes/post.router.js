const Router = require('express');
const PostModel = require("../models/post.model");

const rutas = Router();

rutas.get('', function (req, res, next) {
    PostModel.obtenerPosts()
        .then(posts => {
            res.json({
                'estado': 'Ok',
                'posts': posts
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo Posts... "+err);
        });

});

module.exports = rutas;