
//importaciones
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "./db.js";
import { response } from 'express';
dotenv.config();


async function login(req, res) {
  const { email,password } = req.body;
  
    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
      
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                console.error("Error durante el inicio de sesión:", error);
                return res.status(500).send({ status: "Error", message: "Datos invalidos" });
            }

            if (results.length === 0) {
                return res.status(400).send({ status: "Error", message: "No existe el usuario" });
            }
            console.log(results)
            
            //comparacion de la contraseña con bcrypts
            const usuarioRevisar = results[0];
            bcryptjs.compare(password, usuarioRevisar.password, (compareError, logincorrecto) => {
                if (compareError) {
                    console.error("Error durante el inicio de sesión:", compareError);
                    return res.status(500).send({ status: "Error", message: "Contraseña incorrecta" });
                }

                if (!logincorrecto) {
                    return res.status(400).send({ status: "Error", message: "verificar los datos ingresados" });
                }

                const token = jsonwebtoken.sign(
                    { user: usuarioRevisar.nombre },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION }
                );

                const cookieOption = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    path: "/",
                    sameSite: 'Lax' 
                };

                res.cookie("jwt", token, cookieOption);
                res.send({ status: "ok", message: "Usuario loggeado", token,"usuario":results});
            });
        });
    } catch (error) {
        return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}


async function register(req, res) {
    try {
        const { user,email,password,ciudad } = req.body;

       
        if (!user || !password || !email ||!ciudad) {
            return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
        }

       
        const query = "SELECT * FROM users WHERE user = ?";
        connection.query(query, [user], async (error, results, fields) => {
            if (error) {
                return res.status(500).send({ status: "Error", message: "El usuario ya existe" });
            }

            if (results.length > 0) {
                return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
            }

           
            const salt = await bcryptjs.genSalt(5); 
            const hashContraseña = await bcryptjs.hash(password, salt);
            const fechaCreacion = new Date().toISOString().split('T')[0];

            const insertQuery = "INSERT INTO users (user, email, password, dc, ciudad) VALUES (?, ?, ?, ?, ?)";
            connection.query(insertQuery, [user, email, hashContraseña, fechaCreacion,ciudad], (insertError, insertResults, insertFields) => {
                if (insertError) {
                    console.error("Error al registrar al usuario:", insertError);
                    return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
                }

             
                res.status(201).send({ status: "ok", message: `Usuario ${user} agregado` });
            });
        });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error });
    }
}


async function logout(req, res = response) {
    try {
        res.clearCookie("jwt");
        res.status(200).send({ status: "ok", message: "Usuario deslogueado exitosamente" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error });
    }
}

function crearPublicacion(req, res, next) {
    const { id_usuario, titulo, categoria, texto } = req.body;
  

    if (!id_usuario || !titulo || !categoria || !texto) {
      return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
  
  
    const query = "SELECT * FROM publicaciones WHERE titulo = ?";
    connection.query(query, [titulo], (error, results) => {
      if (error) {
        console.error("Error al verificar el título:", error);
        return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
      }
  
      if (results.length > 0) {
        return res.status(400).send({ status: "Error", message: "La publicación ya existe" });
      }
  
      const sqlInsert = `INSERT INTO publicaciones (id_usuario, titulo, fecha, categoria, texto) 
                         VALUES (?, ?, DATE(NOW()), ?, ?)`;
      connection.query(sqlInsert, [id_usuario, titulo, categoria, texto], (err, result) => {
        if (err) {
          console.error("Error al crear la publicación:", err);
          return res.status(500).send({ mensaje: "Error al crear la publicación" });
        }
        
        console.log(`Se ha creado una nueva publicación con ID: ${result.insertId}`);
        res.send({ mensaje: "Publicación creada con éxito", id: result.insertId });
      });
    });
  }


function imprimirPublicaciones(callback) {
  const sql = `SELECT 
    p.id,
    u.user AS usuario,
    p.titulo,
    p.fecha,
    p.categoria,
    p.texto
  FROM 
    publicaciones p
  INNER JOIN 
    users u ON p.id_usuario = u.id;`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al imprimir las publicaciones:", err);
      return callback({ status: "Error", message: "Error al imprimir las publicaciones" }, null);
    } 
    if (!result || result.length === 0) {
      return callback({ status: "Error", message: "No se encontraron publicaciones" }, null);
    }

    console.log("Publicaciones encontradas:", result);
    return callback(null, { status: "ok", publicaciones: result });
    
  });
}

function eliminarPublicacion(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      
      const query = "SELECT * FROM publicaciones WHERE id = ?";
      connection.query(query, [id], (error, results) => {
        if (error) {
          console.error("Error de verificacion:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
        
        if (results.length === 0) {
          return res.status(404).send({ mensaje: 'Publicación no encontrada' });
        }
        
        const sql = `DELETE FROM publicaciones WHERE id = ?`;
        connection.query(sql, [id], (error, result) => {
          if (error) {
            console.error("Error al eliminar publicación:", error);
            return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
          }
          
          res.send({
            mensaje: `Publicación eliminada con éxito `,
          });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ mensaje: 'Error al eliminar publicación' });
    }
  }

  function editarPublicacion(req, res) {
    try {
      const { id } = req.params;
      const { titulo, texto, categoria } = req.body;
      console.log(id);
      console.log(titulo, texto, categoria);
  
      const query = "SELECT * FROM publicaciones WHERE titulo = ?";
      connection.query(query, [titulo], (error, resultado) => {
        if (error) {
          console.error("Error de verificación:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
  
       
        if (resultado.length > 0 && resultado[0].id !== parseInt(id)) {
          return res.status(400).send({ mensaje: 'Título ya existe' });
        }
  
    
        const sql = `UPDATE publicaciones SET titulo = ?, texto = ?, categoria = ? WHERE id = ?`;
        connection.query(sql, [titulo, texto, categoria, id], (error, result) => {
          if (error) {
            console.error("Error al actualizar publicación:", error);
            return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
          }
  
          res.send({ mensaje: `Publicación actualizada con éxito` });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ mensaje: 'Error al actualizar publicación' });
    }
  }

function imprimirUsuarios(callback) {
    const sql = `SELECT U.user, U.ciudad FROM users U`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error al imprimir los usuarios:", err);
        return callback({ status: "Error", message: "Error  usuarios" }, null);
      } 
      if (!result || result.length === 0) {
        return callback({ status: "Error", message: "No usuarios" }, null);
      }
  
      console.log("Usuarios encontradas:", result);
      return callback(null, { usuarios: result });
    });
  }

  function imprimirComentarios(req, res) {
    try {
        const { id } = req.params;
        
        console.log("id publicacion:", id);
    
        const query = `
          SELECT 
              c.id,
              u.user AS usuario, 
              c.id_publicacion,
              c.comentario,
              c.fecha
          FROM 
              comentarios c
          INNER JOIN 
              users u ON c.id_usuario = u.id
          WHERE 
              c.id_publicacion = ?;
        `;
        
        connection.query(query, [id], (error, resultado) => {
            if (error) {
                console.error("Error de verificación:", error);
                return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
            }
            
            // Enviar el resultado como respuesta
            res.send({ status: "Success", data: resultado });
        });

    } catch (err) {
        console.error("Error en el try-catch:", err);
        res.status(500).send({ mensaje: 'Error al obtener los comentarios' });
    }
}


function crearComentario(req, res, next) {
  const { id_usuario, id_publicacion,comentario } = req.body;


  if ( !id_usuario || !id_publicacion || !comentario) {
    return res.status(400).send({ status: "Error", message: "faltan datos" });
  }

    const sqlInsert = `INSERT INTO comentarios (id_usuario, id_publicacion, comentario,fecha) 
                       VALUES (?, ?, ?, DATE(NOW()))`;
    connection.query(sqlInsert, [id_usuario, id_publicacion, comentario], (err, result) => {
      if (err) {
        return res.status(500).send({ mensaje: err});
      }
      res.send({ mensaje: "comentario creado con exito", id: result.insertId });
    });

}

function eliminarComentario(req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    
    const query = "SELECT * FROM comentarios WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error de verificacion:", error);
        return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
      }
      
      if (results.length === 0) {
        return res.status(404).send({ mensaje: 'Comentario ausente' });
      }
      
      const sql = `DELETE FROM comentarios WHERE id = ?`;
      connection.query(sql, [id], (error, result) => {
        if (error) {
          console.error("Error al eliminar comentario:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
        
        res.send({
          mensaje: `Comentario eliminado exitosamente `,
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: 'Error al eliminar comentario' });
  }
}

function imprimirRanking(callback) {
  const sql = `SELECT p.id, p.titulo, COUNT(c.id) AS cantidad_comentarios
FROM publicaciones p
LEFT JOIN comentarios c ON p.id = c.id_publicacion
GROUP BY p.id
ORDER BY cantidad_comentarios DESC
LIMIT 3;`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al imprimir el ranking:", err);
      return callback({ status: "Error", message: "Error al imprimir el ranking" }, null);
    } 
    if (!result || result.length === 0) {
      return callback({ status: "Error", message: "No se encontraron comentarios" }, null);
    }

    console.log("Ranking:", result);
    return callback(null, { status: "ok", ranking: result });
    
  });
}

/* EXPORTACIÓN DE MÉTODOS */
export const methods = {
login,
register,
logout,
crearPublicacion,
imprimirPublicaciones,
imprimirUsuarios,
eliminarPublicacion,
editarPublicacion,
imprimirComentarios,
crearComentario,
eliminarComentario,
imprimirRanking

}
