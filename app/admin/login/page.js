"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-extrabold text-ink mb-1">
            西蘭 <span className="text-hanko">NISHIRAN</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-navy">
            Acesso da redação
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-2 border-ink p-6 flex flex-col gap-4 bg-white/40"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wide text-navy">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
              placeholder="reporter@nishiran.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wide text-navy">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm font-body text-hanko border border-hanko/40 bg-hanko/5 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-ink text-paper font-body font-bold py-2 hover:bg-hanko transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar na redação"}
          </button>
        </form>

        <p className="text-xs font-body text-navy text-center mt-4">
          Contas de repórter são criadas pela coordenação do jornal — fale com
          quem administra o Nishiran se você ainda não tem acesso.
        </p>
      </div>
    </div>
  );
}
