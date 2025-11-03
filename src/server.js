import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { Usuario, Producto, Pedido } from "./models/Relaciones.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Verificar conexión
sequelize.authenticate()
  .then(() => console.log("✅ Conexión con PostgreSQL establecida"))
  .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));

// Sincronizar tablas (solo al inicio)
sequelize.sync({ alter: true })
  .then(() => console.log("🗄️ Tablas sincronizadas correctamente"))
  .catch(err => console.error("❌ Error al sincronizar tablas:", err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
