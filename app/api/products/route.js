import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // เรียกใช้ Prisma ที่เราตั้งค่าไว้

// 1. GET: ดึงข้อมูลสินค้าทั้งหมด
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' } // เรียงจากใหม่ไปเก่า
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

// 2. POST: เพิ่มสินค้าใหม่
export async function POST(req) {
  try {
    const body = await req.json(); // รับข้อมูลที่ส่งมา
    const { name, price, description, imageUrl } = body;

    // สร้างสินค้าลง Database
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price), // แปลงเป็นตัวเลขเผื่อส่งมาเป็น string
        description,
        imageUrl,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}