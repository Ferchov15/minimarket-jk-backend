import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Producto = sequelize.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
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
}, {
  tableName: "productos",
  timestamps: false,
});

export default Producto;
