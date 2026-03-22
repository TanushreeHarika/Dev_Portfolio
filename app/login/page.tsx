"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#D8D0C0 1px, transparent 1px), linear-gradient(90deg, #D8D0C0 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/8 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-accent/5 blur-2xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-40 h-40 bg-accent/5 blur-2xl"
        style={{
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          animation: "morphSpin 8s ease-in-out infinite, float 6s ease-in-out infinite",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Top label */}
        <div className="text-center mb-8">
          <p className="font-mono text-[0.68rem] tracking-[0.25em] uppercase text-accent flex items-center justify-center gap-3 mb-4">
            <span className="block w-6 h-px bg-accent" />
            Admin Access
            <span className="block w-6 h-px bg-accent" />
          </p>
          <h1 className="font-playfair text-[clamp(2rem,5vw,3rem)] font-black tracking-tight text-ink">
            Welcome <em className="italic text-accent">back.</em>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-parchment/80 backdrop-blur-xl border border-border p-8 md:p-10 shadow-xl shadow-ink/5">
          {/* Error message */}
          {error && (
            <div className="mb-6 px-4 py-3 border border-red-400/40 bg-red-50/80 text-red-700 font-mono text-[0.72rem] tracking-wide flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current flex-shrink-0">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-cream border border-border px-4 py-3 font-dm text-[0.88rem] text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-cream border border-border px-4 py-3 pr-12 font-dm text-[0.88rem] text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-mono text-[0.75rem] tracking-[0.12em] uppercase bg-ink text-cream px-6 py-3.5 border border-ink hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-ink disabled:hover:text-cream shine-sweep btn-ripple flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center font-mono text-[0.6rem] tracking-[0.1em] text-muted/60">
            Protected area · Authorized access only
          </p>
        </div>

        {/* Back to portfolio */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors duration-300 inline-flex items-center gap-2"
          >
            <span>←</span> Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
