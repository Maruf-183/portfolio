"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setIsLoggedIn(!!data.session);
    setChecking(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      setIsLoggedIn(true);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0F19",
        }}
      >
        <Loader2 size={28} color="#22d3ee" className="spin" />
        <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0B0F19",
          color: "#fff",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>
          ✅ Login Successful
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Admin dashboard will be built here in the next steps.
        </p>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0B0F19",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(34,211,238,0.15)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "380px",
          padding: "36px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(34,211,238,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Lock size={20} color="#22d3ee" />
          </div>
          <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>
            Admin Access
          </h1>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                color="#64748b"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                color="#64748b"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{ fontSize: "12px", color: "#f87171", textAlign: "center" }}>
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#06b6d4",
              color: "#020617",
              border: "none",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "6px",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}