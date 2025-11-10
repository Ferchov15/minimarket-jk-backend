import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

// Rutas CRUD
router.post("/", crearProducto);           // Crear producto
router.get("/", obtenerProductos);         // Listar productos
router.get("/:id", obtenerProductoPorId);  // Ver producto específico
router.put("/:id", actualizarProducto);    // Editar producto
router.delete("/:id", eliminarProducto);   // Eliminar producto

export default router;
