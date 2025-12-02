import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  name: String,
  duration: String,
  price: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)
