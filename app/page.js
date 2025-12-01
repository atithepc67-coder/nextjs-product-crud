import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

      <div className="z-10 max-w-3xl space-y-6">
        
        {/* Title */}
       {/* แก้ไข H1: เอา text-transparent ออกก่อน เพื่อความชัวร์ว่าไม่ซ้อน */}
<h1 className="text-6xl md:text-8xl font-black tracking-tight text-white pb-4 drop-shadow-lg">
  MY NEXT<span className="text-purple-500">.</span>JS
</h1>
        
        {/* Subtitle: แก้ให้สั้นลง ไม่ซ้ำซ้อน */}
        <div className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto space-y-1">
          <p>Product Management System</p>
          <p className="text-purple-400 text-sm font-medium opacity-80">Next.js 15 • Prisma • MySQL</p>
        </div>

        {/* Buttons: เพิ่มปุ่ม Register เข้าไป */}
<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
  <Link href="/products">
    <button className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
      🚀 Dashboard
    </button>
  </Link>

  <Link href="/login">
    <button className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
      เข้าสู่ระบบ
    </button>
  </Link>

  {/* ✅ ปุ่มใหม่: สมัครสมาชิก */}
  <Link href="/register">
    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg">
      สมัครสมาชิก
    </button>
  </Link>
</div>

      </div>

      <div className="absolute bottom-6 text-slate-600 text-xs uppercase tracking-widest">
        DIT205 Project • 6706896
      </div>
    </div>
  );
}