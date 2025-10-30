import mongoose from "mongoose";

const pointSchema = new mongoose.Schema(
  {
    title: String,
    barrio: String,
    types: [String], // ["plastico","vidrio",...]
    estado: { type: String, enum: ["activo","inactivo"], default: "activo" },
    address: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true } // [lng, lat]
    }
  },
  { timestamps: true }
);

pointSchema.index({ location: "2dsphere" });

export default mongoose.model("Point", pointSchema);
