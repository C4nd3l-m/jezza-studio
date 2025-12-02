import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''

if (!MONGO_URI) throw new Error('Define MONGO_URI en .env')

// Declare global type for mongoose cache
declare global {
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

export async function connectMongo() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then(m => m.connection)
  }
  cached.conn = await cached.promise
  return cached.conn
}
