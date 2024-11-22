import express from "express";
import cookieParser from "cookie-parser"; 
import { methods as autenthication } from "./controllers/controladores.js"; 
import cors from 'cors'; 

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
})); 

app.use(express.json());
app.use(cookieParser()); 


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


app.post("/api/register", autenthication.register);
app.post("/api/login", autenthication.login);
app.get("/api/logout", autenthication.logout);


app.post("/api/publicacion", autenthication.crearPublicacion );


app.get('/api/publicacion', (req, res) => {
  autenthication.imprimirPublicaciones((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});
app.delete("/api/publicacion/:id", autenthication.eliminarPublicacion);
app.put("/api/publicacion/:id", autenthication.editarPublicacion);

app.get('/api/usuarios', (req, res) => {
  autenthication.imprimirUsuarios((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

app.get("/api/comentarios/:id", autenthication.imprimirComentarios);

app.post("/api/comentarios", autenthication.crearComentario );

app.delete("/api/comentarios/:id", autenthication.eliminarComentario);

app.get('/api/ranking', (req, res) => {
  autenthication.imprimirRanking((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

