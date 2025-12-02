import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongo";
import Product from "@/models/Product";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
    try {
        await connectMongo();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments();
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({ products, total });
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { error: "Error fetching products" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const price = parseFloat(formData.get("price") as string) || 0;
        const description = (formData.get("description") as string) || "";
        const category = (formData.get("category") as string) || "";
        const available = formData.get("available") === "true";
        const imageFile = formData.get("image") as File | null;

        let imageUrl = "";
        let imagePublicId = "";

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = `data:${imageFile.type};base64,${buffer.toString(
                "base64"
            )}`;

            const uploadResult = await uploadToCloudinary(base64Image, "products");
            imageUrl = uploadResult.url;
            imagePublicId = uploadResult.publicId;
        }

        const product = await Product.create({
            name,
            price,
            description,
            category,
            available,
            imageUrl,
            imagePublicId,
        });

        return NextResponse.json({ product }, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/products error:", error);
        return NextResponse.json(
            { error: "Error creating product", details: error.message },
            { status: 500 }
        );
    }
}
