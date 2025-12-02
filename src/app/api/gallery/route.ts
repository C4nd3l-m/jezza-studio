import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import GalleryItem from '@/models/GalleryItem'
import { getSession } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
    try {
        await connectMongo()
        const items = await GalleryItem.find({}).sort({ createdAt: -1 })
        return NextResponse.json(items)
    } catch (error) {
        console.error('Error fetching gallery:', error)
        return NextResponse.json({ error: 'Error al obtener galería' }, { status: 500 })
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
        const item = await GalleryItem.create(body)
        return NextResponse.json(item, { status: 201 })
    } catch (error) {
        console.error('Error creating gallery item:', error)
        return NextResponse.json({ error: 'Error al crear imagen' }, { status: 500 })
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

        // Find the item to get cloudinaryId
        const item = await GalleryItem.findById(id)

        if (!item) {
            return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 })
        }

        // Delete from Cloudinary if cloudinaryId exists
        if (item.cloudinaryId) {
            try {
                await deleteFromCloudinary(item.cloudinaryId)
            } catch (error) {
                console.error('Error deleting from Cloudinary:', error)
                // Continue with database deletion even if Cloudinary deletion fails
            }
        }

        // Delete from database
        await GalleryItem.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting gallery item:', error)
        return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 })
    }
}
