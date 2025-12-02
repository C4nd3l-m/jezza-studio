// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }, // URL devuelta por Cloudinary
    imagePublicId: { type: String }, // public_id de Cloudinary (útil para borrar)
    category: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
