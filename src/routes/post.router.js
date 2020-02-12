const Router = require('express');
const PostModel = require("../models/post.model");
const UsuarioModel = require("../models/usuario.model");
const nodemailer = require('nodemailer');


const rutas = Router();


function sendMails(data) {
    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'correo@gmail.com',
            pass: 'passwordcorreo'
        }
        
    });

    var mailOptions = {
        from: 'correo@gmail.com',
        to: data,
        subject: 'Tarjeta de Cumpleaños',
        html: '<img src="http://159.65.228.145/imagesigec/card.jpeg"/>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
    return true;
}


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


let usuarios = async() => {
    const users = await UsuarioModel.obtenerUsuarios();
    console.log(users);
    //console.log(usuarios['usuarios'].correo);

    return users;
}

rutas.post('/insertar', (req, res) => {

    PostModel.insertarPost(req.body).then(res => {
        if (res) {

            res.json({
                'estado': OK,
                'mensaje': 'Post insertado'
            });
        } else {
            res.json({
                'estado': ERROR,
                'error': 'No se insertó el Post'
            });
        }
    }).catch(err => {
        return res.status(500).send("Error insertando Post... "+err);
    });
});


rutas.post('/notificar', (req, res) => {

    let enviado = sendMails(req.body.mail);

    if (enviado) {
        res.json({
            'estado': 'OK',
            'mensaje': 'Notificado'
        });
    } else {
        res.json({
            'estado': 'ERROR',
            'mensaje': 'No se Notifico'
        });
    }
});


module.exports = rutas;