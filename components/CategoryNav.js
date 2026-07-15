"use client";

const CATEGORIES = ["Notícias", "Entrevistas", "Colunas", "Comunidade"];

export default function CategoryNav({ active, setActive }) {
  const all = ["Todos", ...CATEGORIES];
  return (
    <nav className="flex gap-1 overflow-x-auto px-5 md:px-10 border-b border-paperDark">
      {all.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className={`px-4 py-3 text-sm whitespace-nowrap transition-colors relative font-body ${
            active === c ? "font-bold text-hanko" : "font-medium text-ink"
          }`}
        >
          {c}
          {active === c && (
            <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-hanko" />
          )}
        </button>
      ))}
    </nav>
  );
}
