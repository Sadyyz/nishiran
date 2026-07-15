"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import CategoryNav from "./CategoryNav";
import ArticleCard from "./ArticleCard";
import Hero from "./Hero";

export default function HomeClient({ articles, featured }) {
  const [active, setActive] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const catOk = active === "Todos" || a.category === active;
      const qOk =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(query.toLowerCase());
      return catOk && qOk && a.id !== featured.id;
    });
  }, [active, query, articles, featured.id]);

  const showHero = active === "Todos" && query.trim() === "";

  return (
    <>
      <CategoryNav active={active} setActive={setActive} />

      <div className="px-5 md:px-10 py-3 border-b border-paperDark">
        <div className="flex items-center gap-2 max-w-sm">
          <Search size={15} className="text-navy" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar matéria..."
            className="w-full bg-transparent outline-none text-sm py-1 font-body text-ink"
          />
        </div>
      </div>

      {showHero && <Hero a={featured} />}

      <div className="px-5 md:px-10 py-8">
        {filtered.length === 0 ? (
          <p className="text-sm font-body text-navy">
            Nenhuma matéria encontrada com esses termos. Tente outra busca ou categoria.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {filtered.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
