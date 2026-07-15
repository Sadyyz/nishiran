import Masthead from "../components/Masthead";
import Footer from "../components/Footer";
import HomeClient from "../components/HomeClient";
import { ARTICLES } from "../data/articles";

export default function HomePage() {
  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Masthead />
      <HomeClient articles={ARTICLES} featured={featured} />
      <Footer />
    </div>
  );
}
