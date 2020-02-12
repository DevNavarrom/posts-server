const PostgreSql = require('../database/postgreSql');

class PostModel {
    static async obtenerPosts() {
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `SELECT * FROM posts.post`,  
        );

        return res.rows;
    }


    static async insertarPost(post){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `INSERT INTO posts.post(id, titulo, descripcion, fecha, usuario_id)
                VALUES ($1, $2, $3, $4, $5)`, [ 
                    post.id,
                    post.titulo, 
                    post.descripcion, 
                    post.fecha, 
                    post.usuario_id
                ]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }


    static async actualizarPost( post ){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `UPDATE posts.post SET titulo = $1, descripcion = $2, fecha = $3, usuario_id = $4 
            WHERE id = $5`, [
                post.titulo, 
                post.descripcion, 
                post.fecha, 
                post.usuario_id, 
                post.id
            ]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    
    static async eliminarPost(id){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `DELETE FROM posts.post WHERE id = $1`, [ id ]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = PostModel;