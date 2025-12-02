// src/app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Testimonial from '@/models/Testimonial'

export async function GET() {
    await dbConnect()
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 })
    return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const { name, text } = await req.json()
    if (!name || !text) {
        return NextResponse.json({ error: 'Nombre y texto requeridos' }, { status: 400 })
    }
    const testimonial = await Testimonial.create({ name, text })
    return NextResponse.json(testimonial, { status: 201 })
}
