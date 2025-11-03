import Usuario from "./Usuario.js";
import Producto from "./Producto.js";
import Pedido from "./Pedido.js";
import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

// Tabla intermedia para productos en un pedido
const PedidoProducto = sequelize.define("PedidoProducto", {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: "pedido_productos",
  timestamps: false,
});

// Relaciones
Pedido.belongsToMany(Producto, { through: PedidoProducto });
Producto.belongsToMany(Pedido, { through: PedidoProducto });

export { Usuario, Producto, Pedido, PedidoProducto };
