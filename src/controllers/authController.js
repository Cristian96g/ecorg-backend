import User from "../models/userModel.js";
import { signToken } from "../middleware/auth.js";

export async function register(req, res) {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: "Faltan campos" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email ya registrado" });

    const user = await User.create({ nombre, email, password, role: "user" });
    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.status(201).json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: "No se pudo registrar" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
  } catch {
    res.status(500).json({ error: "No se pudo iniciar sesión" });
  }
}
