import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const timestamp = Date.now()
        const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`
        const publicPath = join(process.cwd(), 'public', 'uploads')

        // Ensure uploads directory exists
        try {
            await mkdir(publicPath, { recursive: true })
        } catch (error) {
            // Directory might already exist
        }

        const filepath = join(publicPath, filename)
        await writeFile(filepath, buffer)

        const url = `/uploads/${filename}`
        return NextResponse.json({ url })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
    }
}
