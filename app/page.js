import Masthead from "../components/Masthead";
import Footer from "../components/Footer";
import HomeClient from "../components/HomeClient";
import { createClient } from "../lib/supabase/server";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("inserted_at", { ascending: false });

  const list = articles || [];
  const featured = list.find((a) => a.featured) || list[0];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Masthead />
      {list.length === 0 ? (
        <p className="px-5 md:px-10 py-10 font-body text-navy">
          Nenhuma matéria publicada ainda. Assim que a redação publicar algo em
          <code className="mx-1">/admin</code>, ela aparece aqui.
        </p>
      ) : (
        <HomeClient articles={list} featured={featured} />
      )}
      <Footer />
    </div>
  );
}
