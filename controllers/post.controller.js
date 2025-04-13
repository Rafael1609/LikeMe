import { json } from "express";
import {
  deleteCurrentPost,
  getAllPosts,
  incrementLike,
  insertPost,
} from "../models/post.models.js";

export const getPost = async (req, res) => {
  try {
    const posts = await getAllPosts();
    console.log("✅ GET /posts ejecutado correctamente");
    res.json(posts);
  } catch (error) {
    console.error("❌ Error en GET /posts:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    if (!titulo || !img || !descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const post = await insertPost(titulo, img, descripcion);
    console.log("✅ POST /posts ejecutado correctamente");
    res.status(201).json(post);
  } catch (error) {
    console.error("❌ Error en POST /posts:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPost = await incrementLike(id);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCurrentPost(id);
    if (!result) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
