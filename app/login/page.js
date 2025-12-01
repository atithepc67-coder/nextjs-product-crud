"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      router.push(callbackUrl);
 }
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>เข้าสู่ระบบ</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width:"100%"}} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{width:"100%"}} />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
