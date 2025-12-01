"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setErr(data.message);

    setMsg("สร้างบัญชีเรียบร้อย! กำลังไปหน้า Login…");
    setTimeout(() => router.push("/login"), 1000);
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>สมัครสมาชิก</h1>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%"}} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
       <label>Email</label>
          <input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)} style={{width:"100%"}} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input type="password" value={password} required onChange={(e)=>setPassword(e.target.value)} style={{width:"100%"}} />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
