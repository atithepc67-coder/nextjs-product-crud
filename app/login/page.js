"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res.error) {
      setErrorMsg("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black flex items-center justify-center p-4">
      
      {/* กล่อง Login แบบกระจก */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-black text-center text-white mb-6">
          Welcome Back <span className="block text-lg font-normal text-slate-400 mt-1">เข้าสู่ระบบเพื่อจัดการสต็อก</span>
        </h1>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          ยังไม่มีบัญชีใช่ไหม?{" "}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition-colors">
            สมัครสมาชิกที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}