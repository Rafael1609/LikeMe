import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());
// Resto del código...

// Configuración de conexión a la base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "like-me",
  password: "123456",
  port: 5432,
});

// Ruta GET: Obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts order by id asc");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta POST: Agregar un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)",
      [titulo, img, descripcion]
    );
    res.status(201).json({ message: "Post agregado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "update posts set likes = likes + 1 where id = $1 returning *",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 returning *",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
