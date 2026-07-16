import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import Masthead from "../../../components/Masthead";
import Footer from "../../../components/Footer";
import ArticleCard from "../../../components/ArticleCard";
import Seal from "../../../components/Seal";
import { createClient } from "../../../lib/supabase/server";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, subtitle")
    .eq("slug", params.slug)
    .single();

  if (!article) return { title: "Matéria não encontrada — Nishiran" };
  return {
    title: `${article.title} — Nishiran`,
    description: article.subtitle,
  };
}

export default async function ArticlePage({ params }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!article) notFound();

  const { data: relatedRaw } = await supabase
    .from("articles")
    .select("*")
    .eq("category", article.category)
    .neq("id", article.id)
    .limit(3);

  const related = relatedRaw || [];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Masthead />

      <div className="px-5 md:px-10 py-8 max-w-3xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm mb-6 font-body text-navy w-fit"
        >
          <ArrowLeft size={15} /> Voltar para a capa
        </Link>

        <div className="text-[11px] tracking-widest uppercase mb-3 font-mono text-hanko">
          {article.category}
        </div>

        <h1 className="text-3xl md:text-5xl leading-[1.05] mb-4 font-display font-extrabold text-ink">
          {article.title}
        </h1>

        <p className="text-lg mb-5 font-display italic text-[#4A4033]">
          {article.subtitle}
        </p>

        {article.media_url && (
          <div className="mb-6 -mx-5 md:mx-0">
            {article.media_type === "video" ? (
              <video
                src={article.media_url}
                controls
                className="w-full max-h-[480px] object-cover"
              />
            ) : (
              <img
                src={article.media_url}
                alt={article.title}
                className="w-full max-h-[480px] object-cover"
              />
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-paperDark">
          <Seal ch={article.seal} size={40} />
          <div className="text-sm font-body text-navy">
            <div className="font-bold text-ink">{article.author}</div>
            <div className="flex items-center gap-1 text-xs">
              <CalendarDays size={12} /> {article.article_date} · {article.read_time} de leitura
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {article.body.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed font-body text-[#2B241C]">
              {i === 0 ? (
                <>
                  <span className="font-display font-extrabold text-[2.4em] leading-none float-left mr-[0.08em] text-hanko">
                    {p.charAt(0)}
                  </span>
                  {p.slice(1)}
                </>
              ) : (
                p
              )}
            </p>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-12 pt-6 border-t-2 border-ink">
            <div className="text-[11px] tracking-widest uppercase mb-4 font-mono text-navy">
              Leia também
            </div>
            <div className="grid gap-5">
              {related.map((r) => (
                <ArticleCard key={r.id} a={r} compact />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
