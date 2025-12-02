import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import Service from '@/models/Service'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        await connectMongo()
        const services = await Service.find({}).sort({ createdAt: -1 })
        return NextResponse.json(services)
    } catch (error) {
        console.error('Error fetching services:', error)
        return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 })
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
        const service = await Service.create(body)
        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error('Error creating service:', error)
        return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
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
        const service = await Service.findByIdAndUpdate(_id, data, { new: true })
        return NextResponse.json(service)
    } catch (error) {
        console.error('Error updating service:', error)
        return NextResponse.json({ error: 'Error al actualizar servicio' }, { status: 500 })
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
        await Service.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting service:', error)
        return NextResponse.json({ error: 'Error al eliminar servicio' }, { status: 500 })
    }
}
