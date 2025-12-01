"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchProducts();
  }, [status]);

  const handleDelete = async (id) => {
    if (!confirm("⚠️ ต้องการลบสินค้าชิ้นนี้ใช่ไหม?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 font-sans relative overflow-x-hidden">
        
        {/* Background Ambient */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-400 drop-shadow-lg mb-2">
                Stock Manager
              </h1>
              <p className="text-slate-400 text-sm">
                Admin: <span className="text-white font-medium">{session.user.email?.split('@')[0]}</span> 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="🔍 ค้นหาสินค้า..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 w-full sm:w-64"
              />

              <Link href="/products/create">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap">
                  + New Product
                </button>
              </Link>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p>ไม่พบสินค้า</p>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div key={p.id} className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                  
                  {/* ✅ ส่วนรูปภาพ: ลดขนาดเหลือ h-32 (128px) */}
                  <div className="relative w-full h-32 bg-slate-800 overflow-hidden border-b border-white/5">
                    {p.imageUrl ? (
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📦</div>
                    )}
                  </div>

                  {/* เนื้อหาการ์ด */}
                  <div className="p-4 flex-1 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white truncate pr-2 flex-1">
                        {p.name}
                      </h3>
                    </div>

                    {/* ✅ ย้ายราคามาไว้ตรงนี้ (เห็นชัดแน่นอน) */}
                    <div className="text-xl font-bold text-emerald-400 mb-2">
                      ฿{p.price ? p.price.toLocaleString() : "0"}
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10 overflow-hidden">
                      {p.description || "-"}
                    </p>

                    {/* ปุ่มจัดการ */}
                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <Link href={`/products/${p.id}`} className="w-full">
                        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-blue-400 text-sm font-medium border border-white/5 transition-colors">
                          Edit
                        </button>
                      </Link>
                      
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="w-full py-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white text-red-400 text-sm font-medium border border-white/5 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    );
  }
  return null;
}