import "./globals.css";

export const metadata = {
  title: "Nishiran — Jornal da Comunidade de Gakuran",
  description:
    "O jornal estudantil da comunidade de RP de Gakuran. Notícias, entrevistas e colunas direto dos corredores do colégio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
