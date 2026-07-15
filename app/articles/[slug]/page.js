import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import Masthead from "../../../components/Masthead";
import Footer from "../../../components/Footer";
import ArticleCard from "../../../components/ArticleCard";
import Seal from "../../../components/Seal";
import { ARTICLES } from "../../../data/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Matéria não encontrada — Nishiran" };
  return {
    title: `${article.title} — Nishiran`,
    description: article.subtitle,
  };
}

export default function ArticlePage({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

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

        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-paperDark">
          <Seal ch={article.seal} size={40} />
          <div className="text-sm font-body text-navy">
            <div className="font-bold text-ink">{article.author}</div>
            <div className="flex items-center gap-1 text-xs">
              <CalendarDays size={12} /> {article.date} · {article.read} de leitura
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
