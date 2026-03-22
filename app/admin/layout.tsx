"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.replace("/login");
        }
      })
      .catch(() => router.replace("/login"))
      .finally(() => setChecking(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-muted">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin header */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="font-playfair text-lg font-black italic text-ink hover:text-accent transition-colors duration-300 tracking-tight"
            >
              TH<span className="text-accent">.</span>
            </a>
            <span className="hidden sm:block w-px h-5 bg-border" />
            <span className="hidden sm:block font-mono text-[0.65rem] tracking-[0.18em] uppercase text-accent">
              Content Manager
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted hover:text-ink transition-colors border border-border px-3 py-1.5 hover:border-ink"
            >
              View Site ↗
            </a>
            <button
              onClick={handleLogout}
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-cream bg-ink px-3 py-1.5 hover:bg-accent hover:text-ink transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
