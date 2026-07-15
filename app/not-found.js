import Link from "next/link";
import Masthead from "../components/Masthead";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Masthead />
      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-4 py-16">
        <div className="text-[11px] tracking-widest uppercase font-mono text-hanko">
          Edição esgotada
        </div>
        <h1 className="text-4xl font-display font-extrabold text-ink">
          Essa matéria não foi encontrada
        </h1>
        <p className="font-body text-navy max-w-md">
          Talvez ela tenha sido arquivada ou o link esteja incorreto. Volte
          para a capa e confira as edições atuais.
        </p>
        <Link
          href="/"
          className="mt-2 font-body font-bold text-hanko underline"
        >
          Voltar para a capa
        </Link>
      </div>
      <Footer />
    </div>
  );
}
