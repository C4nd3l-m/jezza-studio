import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  src: String,
  alt: String,
  cloudinaryId: String, // Store Cloudinary public_id for deletion
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GallerySchema)
