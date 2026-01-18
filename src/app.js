import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

const FRONTEND_URLS = [
  "http://localhost:3000",
  "https://minimarket-jk.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (FRONTEND_URLS.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS bloqueado para:", origin);
    return callback(new Error("No permitido por CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.options("/api/*", cors());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);

export default app;
