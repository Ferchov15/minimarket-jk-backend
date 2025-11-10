import { Pedido, Producto, PedidoProducto } from "../models/Relaciones.js";

export const crearPedido = async (req, res) => {
  try {
    const { nombreCliente, productos } = req.body; 
    // productos = [{ id: 1, cantidad: 2 }, { id: 3, cantidad: 1 }]

    const nuevoPedido = await Pedido.create({ nombreCliente });

    for (const item of productos) {
      await PedidoProducto.create({
        pedidoId: nuevoPedido.id,
        productoId: item.id,
        cantidad: item.cantidad,
      });
    }

    res.status(201).json({ mensaje: "Pedido creado correctamente", pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el pedido", error });
  }
};

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: {
        model: Producto,
        as: "productos",
        through: { attributes: ["cantidad"] },
      },
    });

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};