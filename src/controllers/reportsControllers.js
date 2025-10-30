import Report from "../models/Report.js";

function codeFromId(id) {
  const short = id.toString().slice(-6).toUpperCase();
  return `RG-${short}`;
}

export async function createReport(req, res) {
  try {
    const { barrio, titulo, direccion, descripcion, severidad, lng, lat } = req.body;
    const fotos = (req.files || []).map(f => `/uploads/${f.filename}`);

    const doc = await Report.create({
      user: req.user.id,
      barrio,
      titulo,
      direccion,
      descripcion,
      severidad,
      location: (lng && lat) ? { type: "Point", coordinates: [Number(lng), Number(lat)] } : undefined,
      fotos
    });

    if (!doc.code) {
      doc.code = codeFromId(doc._id);
      await doc.save();
    }
    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ error: "No se pudo crear el reporte" });
  }
}

export async function listReports(req, res) {
  const { q, barrio, estado, severidad, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (barrio) filter.barrio = barrio;
  if (estado) filter.estado = estado;
  if (severidad) filter.severidad = severidad;
  if (q) filter.$text = { $search: q };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Report.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}

export async function getReport(req, res) {
  const doc = await Report.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "No encontrado" });
  res.json(doc);
}

// ADMIN: cambiar estado
export async function setReportStatus(req, res) {
  const { estado } = req.body;
  if (!["abierto","en_progreso","resuelto"].includes(estado)) {
    return res.status(400).json({ error: "Estado inválido" });
  }
  const doc = await Report.findByIdAndUpdate(req.params.id, { estado }, { new: true });
  res.json(doc);
}
