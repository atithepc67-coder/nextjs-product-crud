"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; 

export default function EditProductPage({ params }) {
  // รับ ID จาก URL (เช่น /products/1 ก็จะได้ id = 1)
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลเก่ามาใส่ในฟอร์ม
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description || ""); 
        } else {
          alert("หาข้อมูลสินค้าไม่เจอ");
          router.push("/products");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  // 2. เมื่อกดปุ่ม "บันทึก"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT", // ส่งคำสั่งแก้ไข (PUT)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
      });

      if (res.ok) {
        alert("แก้ไขข้อมูลสำเร็จ!");
        router.push("/products"); // กลับไปหน้ารายการ
        router.refresh();
      } else {
        alert("แก้ไขไม่สำเร็จ");
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  if (loading) return <div className="p-10">กำลังโหลดข้อมูลเดิม...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>แก้ไขสินค้า (ID: {id})</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <div>
          <label>ชื่อสินค้า:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>ราคา:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>รายละเอียด:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button 
            type="submit" 
            style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginRight: "10px" }}
          >
            บันทึกการแก้ไข
          </button>
          
          <button 
            type="button"
            onClick={() => router.back()}
            style={{ padding: "10px 20px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}