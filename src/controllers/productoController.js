import Producto from "../models/Producto.js";

// 🟢 Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, descuento, imagen, categoria } = req.body;

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      descuento,
      imagen,
      categoria,
    });

    res.status(201).json({ mensaje: "✅ Producto creado correctamente", producto: nuevoProducto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "❌ Error al crear el producto", error });
  }
};

//  Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al obtener los productos", error });
  }
};

//  Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al obtener el producto", error });
  }
};

//  Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, descuento, imagen, categoria } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    await producto.update({
      nombre,
      descripcion,
      precio,
      stock,
      descuento,
      imagen,
      categoria,
    });

    res.json({ mensaje: "✅ Producto actualizado correctamente", producto });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al actualizar el producto", error });
  }
};

//  Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    await producto.destroy();
    res.json({ mensaje: "🗑️ Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al eliminar el producto", error });
  }
};
