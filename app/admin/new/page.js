import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "../../../components/admin/ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-paper text-ink px-5 md:px-10 py-8">
      <Link
        href="/admin"
        className="flex items-center gap-1 text-sm mb-6 font-body text-navy w-fit"
      >
        <ArrowLeft size={15} /> Voltar ao painel
      </Link>

      <h1 className="text-3xl font-display font-extrabold mb-6">
        Nova matéria
      </h1>

      <ArticleForm action={createArticle} submitLabel="Publicar matéria" />
    </div>
  );
}
