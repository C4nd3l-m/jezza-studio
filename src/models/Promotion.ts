import mongoose from 'mongoose'

const PromotionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  cloudinaryId: String, // Store Cloudinary public_id for deletion
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Promotion || mongoose.model('Promotion', PromotionSchema)
