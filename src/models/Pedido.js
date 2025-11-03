import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("En proceso", "Completado", "Cancelado"),
    defaultValue: "En proceso",
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "pedidos",
  timestamps: false,
});

export default Pedido;
