import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import Promotion from '@/models/Promotion'
import { getSession } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
    try {
        await connectMongo()
        const promotions = await Promotion.find({}).sort({ createdAt: -1 })
        return NextResponse.json(promotions)
    } catch (error) {
        console.error('Error fetching promotions:', error)
        return NextResponse.json({ error: 'Error al obtener promociones' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const body = await req.json()
        await connectMongo()
        const promotion = await Promotion.create(body)
        return NextResponse.json(promotion, { status: 201 })
    } catch (error) {
        console.error('Error creating promotion:', error)
        return NextResponse.json({ error: 'Error al crear promoción' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { _id, ...data } = await req.json()
        await connectMongo()
        const promotion = await Promotion.findByIdAndUpdate(_id, data, { new: true })
        return NextResponse.json(promotion)
    } catch (error) {
        console.error('Error updating promotion:', error)
        return NextResponse.json({ error: 'Error al actualizar promoción' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
        }

        await connectMongo()

        // Find the promotion to get cloudinaryId
        const promotion = await Promotion.findById(id)

        if (!promotion) {
            return NextResponse.json({ error: 'Promoción no encontrada' }, { status: 404 })
        }

        // Delete from Cloudinary if cloudinaryId exists
        if (promotion.cloudinaryId) {
            try {
                await deleteFromCloudinary(promotion.cloudinaryId)
            } catch (error) {
                console.error('Error deleting from Cloudinary:', error)
                // Continue with database deletion even if Cloudinary deletion fails
            }
        }

        // Delete from database
        await Promotion.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting promotion:', error)
        return NextResponse.json({ error: 'Error al eliminar promoción' }, { status: 500 })
    }
}
