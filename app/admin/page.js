import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import { createClient } from "../../lib/supabase/server";
import { signOutAction } from "./actions";
import AdminArticleRow from "../../components/admin/AdminArticleRow";

export default async function AdminDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("inserted_at", { ascending: false });

  const list = articles || [];

  return (
    <div className="min-h-screen bg-paper text-ink px-5 md:px-10 py-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-ink mb-1">
            西蘭 <span className="text-hanko">NISHIRAN</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-navy">
            Painel da redação · logado como {user?.email}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/new"
            className="flex items-center gap-1 bg-ink text-paper font-body font-bold text-sm py-2 px-4 hover:bg-hanko transition-colors"
          >
            <Plus size={15} /> Nova matéria
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center gap-1 border border-paperDark font-body text-sm py-2 px-4 hover:border-navy hover:text-navy transition-colors"
            >
              <LogOut size={15} /> Sair
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-mono text-navy underline"
        >
          Ver site publicado ↗
        </Link>
        <span className="text-xs font-mono text-navy">
          {list.length} matéria{list.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="border-t-2 border-ink mt-2">
        {list.length === 0 ? (
          <p className="py-8 text-sm font-body text-navy">
            Nenhuma matéria publicada ainda. Clique em &quot;Nova matéria&quot; pra
            começar.
          </p>
        ) : (
          list.map((a) => <AdminArticleRow key={a.id} article={a} />)
        )}
      </div>
    </div>
  );
}
