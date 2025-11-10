import dotenv from "dotenv";
dotenv.config();

import  sequelize  from "./config/database.js";
import app from "./app.js";
import "./models/Relaciones.js"; // Para asegurar que las relaciones se carguen

const PORT = process.env.PORT || 4000;

// Verificar conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log("✅ Conexión con PostgreSQL establecida"))
  .catch(err => console.error("❌ Error al conectar con PostgreSQL:", err));

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log("🗄️ Tablas sincronizadas correctamente");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(err => console.error("❌ Error al sincronizar tablas:", err));
