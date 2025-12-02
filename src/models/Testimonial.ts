import mongoose from 'mongoose'

const TestimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
})

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)
