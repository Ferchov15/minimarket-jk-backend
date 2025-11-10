import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Producto = sequelize.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0, // porcentaje de descuento (ej. 10.00 = 10%)
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true, // puede ser null si aún no tiene imagen
    defaultValue: "default.jpg", // imagen por defecto
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: true, // opcional, por si quieres agrupar (ej. 'Juegos', 'Consolas', etc.)
  },
}, {
  tableName: "productos",
  timestamps: true, // recomendable activar timestamps para registrar cuándo se creó/actualizó
});

export default Producto;
