import express from "express";
import { crearPedido, obtenerPedidos } from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);

export default router;
