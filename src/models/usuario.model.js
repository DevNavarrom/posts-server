
const PostgreSql = require('../database/postgreSql');

class UsuarioModel {

    static async obtenerUsuarios() {
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `SELECT * FROM posts.usuario`,  
        );

        return res.rows;
    }

    static async actualizarUsuario(id, nombres, apellidos, usuario, contrasena, correo){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `UPDATE posts.usuario SET nombres = $1, apellidos = $2, usuario = $3, contrasena = $4, 
            correo = $5 WHERE identificacion = $6`, [nombres, apellidos, usuario, contrasena, correo, id]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    static async insertarUsuario(id, nombres, apellidos, usuario, contrasena, correo){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `INSERT INTO posts.usuario(identificacion, nombres, apellidos, usuario, contrasena, correo)
                VALUES ($1, $2, $3, $4, $5, $6)`, [id, nombres, apellidos, usuario, contrasena, correo]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }


}

module.exports = UsuarioModel;