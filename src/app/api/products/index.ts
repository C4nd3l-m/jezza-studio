// pages/api/products/index.js
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import cloudinaryLib from "cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // importante para recibir multipart/form-data
  },
};

const cloudinary = cloudinaryLib.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function parseForm(req) {
  return await new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    // Listado público con paginación simple
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    return res.status(200).json({ products, total });
  }

  if (req.method === "POST") {
    // TODO: acá deberías validar autenticación/rol (ej: checkJWT(req))
    try {
      const { fields, files } = await parseForm(req);
      // fields: name, price, description, category, available
      // files: image (single)
      let uploadResult = null;
      if (files?.image) {
        // formidable puede dar file.path
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "products", // carpeta en Cloudinary
          use_filename: true,
          unique_filename: false,
        });
      }

      const productData = {
        name: fields.name,
        price: Number(fields.price || 0),
        description: fields.description || "",
        category: fields.category || "",
        available: fields.available === "true" || fields.available === true,
      };

      if (uploadResult) {
        productData.imageUrl = uploadResult.secure_url;
        productData.imagePublicId = uploadResult.public_id;
      }

      const product = await Product.create(productData);
      return res.status(201).json({ product });
    } catch (err) {
      console.error("POST /api/products error:", err);
      return res.status(500).json({ error: "Error creating product", details: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
