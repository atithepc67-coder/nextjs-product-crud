import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

// 3. PUT: แก้ไขข้อมูลสินค้า
export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id); // แปลง id จาก URL ให้เป็นตัวเลข
    const body = await req.json();
    const { name, price, description, imageUrl } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

// 4. DELETE: ลบสินค้า
export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}