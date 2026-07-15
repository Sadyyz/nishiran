import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ArticleForm from "../../../../components/admin/ArticleForm";
import { updateArticle } from "../../actions";
import { createClient } from "../../../../lib/supabase/server";

export default async function EditArticlePage({ params }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className="min-h-screen bg-paper text-ink px-5 md:px-10 py-8">
      <Link
        href="/admin"
        className="flex items-center gap-1 text-sm mb-6 font-body text-navy w-fit"
      >
        <ArrowLeft size={15} /> Voltar ao painel
      </Link>

      <h1 className="text-3xl font-display font-extrabold mb-6">
        Editar matéria
      </h1>

      <ArticleForm action={updateWithId} initial={article} submitLabel="Salvar alterações" />
    </div>
  );
}
