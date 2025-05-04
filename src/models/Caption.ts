// src/models/Caption.ts
import mongoose from "mongoose";

const CaptionSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Caption || mongoose.model("Caption", CaptionSchema);
