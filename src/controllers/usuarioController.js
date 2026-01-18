import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

/* =============================
      REGISTRAR USUARIO
============================= */
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hash,
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario", error });
  }
};

/* =====================================
            LOGIN DEL USUARIO
======================================== */
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(contrasena, usuario["contraseña"]);
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 2,
    });

    res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el login" });
  }
};

/* =============================
         LISTAR USUARIOS
============================= */
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nombre", "correo"],
    });

    res.json(usuarios);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

/* =============================
      OBTENER USUARIO POR ID
============================= */
export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      attributes: ["id", "nombre", "correo"],
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener usuario", error });
  }
};

/* ==================================
          ACTUALIZAR USUARIO
===================================== */
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.nombre = nombre ?? usuario.nombre;
    usuario.correo = correo ?? usuario.correo;

    if (contraseña) {
      usuario.contraseña = await bcrypt.hash(contraseña, 10);
    }

    await usuario.save();

    res.json({ mensaje: "Usuario actualizado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario", error });
  }
};

/* ===============================
          ELIMINAR USUARIO
================================== */
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    await usuario.destroy();

    res.json({ mensaje: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario", error });
  }
};

/* =============================
            QUITAR SESION
============================= */

export const logoutUsuario = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ mensaje: "Sesión cerrada" });
};
