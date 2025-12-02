import { connectMongo } from "@/lib/mongo";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
    await connectMongo();

    const hashedPassword = await bcrypt.hash("juli2026*$", 10); // ← Cambia "1234" por la contraseña que quieras

    const admin = await Admin.create({
        username: "jezza:studio",
        password: hashedPassword,
    });

    return Response.json({ ok: true, admin });
}
