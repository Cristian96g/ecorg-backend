import Point from "../models/point.js";

export async function listPoints(req, res) {
  const { tipo, barrio, estado } = req.query;
  const filter = {};
  if (tipo) filter.types = tipo;
  if (barrio) filter.barrio = barrio;
  if (estado) filter.estado = estado;
  const items = await Point.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

export async function createPoint(req, res) {
  const { title, barrio, address, types = [], lng, lat, estado = "activo" } = req.body;
  if (!lng || !lat) return res.status(400).json({ error: "lng/lat requeridos" });
  const doc = await Point.create({
    title, barrio, address, types: Array.isArray(types) ? types : [types],
    estado,
    location: { type: "Point", coordinates: [Number(lng), Number(lat)] }
  });
  res.status(201).json(doc);
}

export async function updatePoint(req, res) {
  const patch = { ...req.body };
  const doc = await Point.findByIdAndUpdate(req.params.id, patch, { new: true });
  res.json(doc);
}

export async function deletePoint(req, res) {
  await Point.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}
