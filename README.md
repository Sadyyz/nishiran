# Nishiran

Jornal estudantil da comunidade de RP de Gakuran. Next.js 14 (App Router) +
Tailwind CSS + Supabase (banco de dados e login da redação), pronto para
publicar no Vercel.

Tem duas partes:
- **Site público** (`/`) — qualquer visitante lê as matérias.
- **Painel da redação** (`/admin`) — só quem tem login de repórter entra,
  pra publicar, editar, apagar e marcar a manchete.

---

## 1. Criar o banco de dados (Supabase)

1. Crie uma conta grátis em https://supabase.com e clique em "New project".
2. Escolha um nome (ex: `nishiran`) e uma senha de banco (guarde ela, mas ela
   não é usada no dia a dia — é só de backup administrativo).
3. Espere o projeto terminar de criar (leva 1-2 minutos).
4. No menu lateral, vá em **SQL Editor → New query**, cole todo o conteúdo
   do arquivo `supabase/schema.sql` (está nesta pasta) e clique em **Run**.
   Isso cria a tabela de matérias, as regras de segurança e já publica 3
   matérias de exemplo.
5. Vá em **Project Settings → API**. Você vai precisar de dois valores:
   - **Project URL**
   - **anon public key**

Guarde os dois — vai usar no passo 3.

---

## 2. Criar as contas de login de cada repórter

Ainda dentro do Supabase:

1. Vá em **Authentication → Users → Add user → Create new user**.
2. Preencha o e-mail e uma senha provisória pra cada repórter da equipe.
3. Marque **"Auto Confirm User"** (assim a pessoa já consegue logar direto,
   sem precisar confirmar e-mail).
4. Repita pra cada pessoa da redação.

Cada um vai entrar em `seusite.vercel.app/admin/login` com o e-mail e senha
que você cadastrou aqui. Quem tiver login consegue publicar, editar, apagar
e marcar manchete — não tem diferença de permissão entre repórteres.

Pra trocar a senha de alguém ou remover acesso, é só voltar nessa mesma tela
(Authentication → Users).

---

## 3. Rodando localmente (opcional, pra testar antes de publicar)

```bash
npm install
cp .env.local.example .env.local
```

Abra `.env.local` e cole o **Project URL** e a **anon public key** que você
pegou no passo 1. Depois:

```bash
npm run dev
```

Abra http://localhost:3000 (site) e http://localhost:3000/admin/login (painel).

---

## 4. Publicando no Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em https://vercel.com → **Add New → Project** → selecione o repositório.
3. Antes de clicar em Deploy, abra **"Environment Variables"** e adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` → o Project URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → a anon public key do Supabase
4. Clique em **Deploy**.

Pronto: `seusite.vercel.app` é o jornal, `seusite.vercel.app/admin/login` é
a entrada da redação. Depois, em qualquer momento, você pode ligar um
domínio próprio em Project Settings → Domains.

---

## Como a redação publica uma matéria

1. Entra em `/admin/login` com e-mail e senha.
2. Clica em **"Nova matéria"**.
3. Preenche título, categoria, autor, data e o texto (parágrafos separados
   por uma linha em branco). O endereço da matéria (slug) é sugerido
   automaticamente a partir do título, mas pode ser editado.
4. Clica em **"Publicar matéria"** — ela já aparece no site na hora.
5. No painel principal, o botão de estrela marca qual matéria é a manchete
   (só uma por vez), o lápis edita, a lixeira apaga (pede confirmação).

---

## Estrutura do projeto

```
app/
  page.js                    → capa do jornal (lê do Supabase)
  layout.js                  → layout raiz + fontes
  not-found.js                → página 404 personalizada
  articles/[slug]/page.js    → página pública de cada matéria
  admin/
    login/page.js             → tela de login do repórter
    page.js                    → painel: lista, editar, apagar, manchete
    new/page.js                → formulário de nova matéria
    edit/[id]/page.js         → formulário de edição
    actions.js                 → server actions (criar/editar/apagar/logout)
components/                  → peças de UI do site público
components/admin/             → formulário e linha de matéria do painel
lib/supabase/                → conexão com o Supabase (navegador e servidor)
middleware.js                  → protege as rotas /admin
supabase/schema.sql            → script que cria a tabela e a segurança
```
