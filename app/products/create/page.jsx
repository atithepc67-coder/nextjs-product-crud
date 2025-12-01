"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // 1. เพิ่ม state สำหรับเก็บ URL รูปภาพ
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 2. ส่ง imageUrl ไปที่ API ด้วย
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, imageUrl }),
    });

    if (res.ok) {
      router.push("/products");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1c2e] via-[#0f1016] to-black flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-purple-600/20 blur-[100px] rounded-full -z-10"></div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center">✨ New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ช่องใส่ชื่อ */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="e.g., Gaming Laptop"
              required
            />
          </div>

          {/* ช่องใส่ราคา */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">Price (THB)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="0.00"
              required
            />
          </div>

          {/* 3. ช่องใส่ลิงก์รูปภาพ (เพิ่มใหม่) */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">Image URL (Link)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-slate-500 mt-2">*Optional. Leave blank for default icon.</p>
          </div>

          {/* ช่องใส่รายละเอียด */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-32 resize-none"
              placeholder="Product details..."
            />
          </div>

          {/* ปุ่มกด */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all hover:shadow-lg hover:shadow-purple-600/20 hover:scale-[1.02] active:scale-95"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}