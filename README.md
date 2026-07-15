# Nishiran

Jornal estudantil da comunidade de RP de Gakuran. Projeto em Next.js 14
(App Router) + Tailwind CSS, pronto para publicar no Vercel.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Publicando no Vercel

**Opção A — pelo site (mais fácil, sem terminal):**

1. Suba esta pasta para um repositório no GitHub (crie um repo vazio e faça
   push destes arquivos).
2. Entre em https://vercel.com, clique em "Add New… → Project".
3. Selecione o repositório. O Vercel detecta que é Next.js sozinho —
   não precisa mudar nenhuma configuração.
4. Clique em "Deploy". Em ~1 minuto o site está no ar com uma URL do tipo
   `nishiran.vercel.app`.
5. Depois, em Project Settings → Domains, dá pra ligar um domínio próprio
   se você comprar um (ex: nishiran.com).

**Opção B — pelo terminal (CLI do Vercel):**

```bash
npm install -g vercel
vercel
```

Siga as perguntas (login, nome do projeto) e ele já te dá o link. Rodar
`vercel --prod` depois publica na URL de produção.

## Como adicionar/editar matérias

Todo o conteúdo do jornal vive em **`data/articles.js`**. Não precisa mexer
em mais nada. Cada matéria é um objeto assim:

```js
{
  id: 9,                          // um número que ainda não exista
  slug: "titulo-em-slug-sem-acento", // vira a URL: /articles/titulo-em-slug-sem-acento
  category: "Notícias",           // Notícias | Entrevistas | Colunas | Comunidade
  featured: false,                // true só na matéria que deve aparecer como manchete
  title: "Título da matéria",
  subtitle: "Linha de apoio abaixo do título.",
  author: "Nome do repórter",
  date: "12 de agosto",
  read: "5 min",
  seal: "報",                      // um kanji/caractere pro selo ao lado do texto
  body: [
    "Primeiro parágrafo...",
    "Segundo parágrafo...",
  ],
}
```

Depois de editar o arquivo, é só salvar, dar commit/push — o Vercel publica
a atualização sozinho a cada push no repositório (deploy automático).

## Estrutura do projeto

```
app/
  page.js                 → capa do jornal
  layout.js                → layout raiz + fontes
  not-found.js              → página 404 personalizada
  articles/[slug]/page.js  → página de cada matéria
components/                → peças de UI (masthead, cards, selo, etc.)
data/articles.js           → todo o conteúdo do jornal
```
