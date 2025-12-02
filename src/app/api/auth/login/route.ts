import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectMongo } from '@/lib/mongo'
import Admin from '@/models/Admin'
import { createSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Usuario y contraseña requeridos' },
                { status: 400 }
            )
        }

        await connectMongo()
        const admin = await Admin.findOne({ username })

        if (!admin) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        const isValid = await bcrypt.compare(password, admin.password)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        await createSession(admin._id.toString())

        return NextResponse.json({ success: true, username: admin.username })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        )
    }
}
