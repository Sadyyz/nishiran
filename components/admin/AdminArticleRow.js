"use client";

import Link from "next/link";
import { Star, Pencil, Trash2 } from "lucide-react";
import { deleteArticle, setFeatured } from "../../app/admin/actions";

export default function AdminArticleRow({ article }) {
  function confirmDelete(e) {
    const ok = window.confirm(
      `Apagar a matéria "${article.title}"? Essa ação não pode ser desfeita.`
    );
    if (!ok) e.preventDefault();
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-paperDark">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-hanko mb-1">
          <span>{article.category}</span>
          {article.featured && (
            <span className="flex items-center gap-1 text-gold">
              <Star size={11} fill="currentColor" /> manchete atual
            </span>
          )}
        </div>
        <p className="font-display font-bold text-ink truncate">{article.title}</p>
        <p className="text-xs font-body text-navy">
          {article.author} · {article.article_date}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {!article.featured && (
          <form action={setFeatured}>
            <input type="hidden" name="id" value={article.id} />
            <button
              type="submit"
              title="Marcar como manchete"
              className="p-2 border border-paperDark hover:border-gold hover:text-gold transition-colors"
            >
              <Star size={15} />
            </button>
          </form>
        )}

        <Link
          href={`/admin/edit/${article.id}`}
          title="Editar"
          className="p-2 border border-paperDark hover:border-navy hover:text-navy transition-colors"
        >
          <Pencil size={15} />
        </Link>

        <form action={deleteArticle} onSubmit={confirmDelete}>
          <input type="hidden" name="id" value={article.id} />
          <button
            type="submit"
            title="Apagar"
            className="p-2 border border-paperDark hover:border-hanko hover:text-hanko transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
