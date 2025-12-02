import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectMongo } from '@/lib/mongo'
import Admin from '@/models/Admin'

// This endpoint creates the initial admin user
// Call it once to set up the admin account
export async function POST() {
    try {
        await connectMongo()

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' })

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Admin ya existe' },
                { status: 400 }
            )
        }

        // Create admin with default credentials
        // Username: admin
        // Password: jezza2024
        const hashedPassword = await bcrypt.hash('jezza2024', 10)

        const admin = await Admin.create({
            username: 'admin',
            password: hashedPassword,
        })

        return NextResponse.json({
            success: true,
            message: 'Admin creado exitosamente',
            username: admin.username
        })
    } catch (error) {
        console.error('Init admin error:', error)
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        )
    }
}
