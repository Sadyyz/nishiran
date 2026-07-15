import Link from "next/link";

export default function Masthead() {
  return (
    <header className="border-b-4 border-ink px-5 pt-6 pb-4 md:px-10">
      <div className="flex items-center justify-between text-[11px] tracking-widest uppercase mb-3 font-mono text-navy">
        <span>Edição nº 12 · Ano Letivo</span>
        <span>Jornal da Comunidade de RP · Gakuran</span>
      </div>
      <div className="flex items-end justify-between flex-wrap gap-3">
        <Link href="/" className="text-left">
          <h1 className="text-5xl md:text-6xl tracking-tight font-display font-extrabold text-ink leading-none">
            西蘭 <span className="text-hanko">NISHIRAN</span>
          </h1>
        </Link>
        <p className="text-sm md:text-base italic max-w-xs text-right font-display text-navy">
          &quot;O que acontece nos corredores, vira manchete.&quot;
        </p>
      </div>
    </header>
  );
}
