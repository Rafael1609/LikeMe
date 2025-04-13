export const getAllPosts = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.error("❌ Error en la consulta de GET:", error.message);
    throw error;
  }
};

export const insertPost = async (titulo, img, descripcion) => {
  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [titulo, img, descripcion]
    );
    return result.rows[0];
  } catch (error) {
    console.error("❌ Error en la consulta de POST:", error.message);
    throw error;
  }
};

export const incrementLike = async (id) => {
  try {
    const result = await pool.query(
      "UPDATE posts SET likes = likes+1 WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error("❌ Error al actualizar el post:", error.message);
    throw error;
  }
};

export const deleteCurrentPost = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("❌ Error al borrar el post:", error.message);
    throw error;
  }
};
