import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    code: { type: String, index: true }, // RG-0001
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    barrio: String,
    titulo: { type: String, required: true },
    direccion: String,
    descripcion: String,
    severidad: { type: String, enum: ["baja","media","alta"], default: "baja" },
    estado: { type: String, enum: ["abierto","en_progreso","resuelto"], default: "abierto" },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: undefined } // [lng, lat]
    },
    fotos: [String] // URLs a /uploads o cloud
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

export default mongoose.model("Report", reportSchema);
