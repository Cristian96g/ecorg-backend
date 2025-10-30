import User from "../models/userModel.js";

export async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
}

export async function updateMe(req, res) {
  const { nombre, telefono, direccion, barrio } = req.body;
  const patch = { nombre, telefono, direccion, barrio };
  if (req.file) {
    patch.avatarUrl = `/uploads/${req.file.filename}`;
  }
  const user = await User.findByIdAndUpdate(req.user.id, patch, { new: true }).select("-password");
  res.json(user);
}

// ADMIN: elevar rol (ejemplo)
export async function setRole(req, res) {
  const { userId, role } = req.body;
  if (!["user","admin"].includes(role)) return res.status(400).json({ error: "Rol inválido" });
  const u = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
  res.json(u);
}
