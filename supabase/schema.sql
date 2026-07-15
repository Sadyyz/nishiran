-- Rode este arquivo inteiro em: Supabase → seu projeto → SQL Editor → New query → Run
-- Ele cria a tabela de matérias, as regras de segurança e já publica as
-- matérias de exemplo pra o site não nascer vazio.

create table if not exists articles (
  id bigint generated always as identity primary key,
  slug text unique not null,
  category text not null check (category in ('Notícias','Entrevistas','Colunas','Comunidade')),
  title text not null,
  subtitle text not null default '',
  author text not null,
  article_date text not null default to_char(now(), 'DD "de" TMMonth'),
  read_time text not null default '4 min',
  seal text not null default '報',
  body text[] not null default '{}',
  featured boolean not null default false,
  created_by uuid references auth.users(id),
  inserted_at timestamptz not null default now()
);

-- Segurança: liga o RLS (Row Level Security) na tabela
alter table articles enable row level security;

-- Qualquer visitante do site pode LER as matérias (é um jornal público)
drop policy if exists "Leitura pública" on articles;
create policy "Leitura pública"
  on articles for select
  using (true);

-- Só quem está logado (repórteres) pode criar matérias
drop policy if exists "Repórteres podem inserir" on articles;
create policy "Repórteres podem inserir"
  on articles for insert
  to authenticated
  with check (true);

-- Só quem está logado pode editar matérias (qualquer uma, não só as próprias —
-- é uma redação, todo mundo pode revisar o texto de todo mundo)
drop policy if exists "Repórteres podem editar" on articles;
create policy "Repórteres podem editar"
  on articles for update
  to authenticated
  using (true);

-- Só quem está logado pode apagar matérias
drop policy if exists "Repórteres podem apagar" on articles;
create policy "Repórteres podem apagar"
  on articles for delete
  to authenticated
  using (true);

-- Matérias de exemplo, só pra o jornal já nascer com conteúdo
insert into articles (slug, category, title, subtitle, author, article_date, read_time, seal, body, featured)
values
(
  'eleicoes-conselho-estudantil-dividem-gakuran',
  'Notícias',
  'Eleições do Conselho Estudantil dividem os corredores de Gakuran',
  'Disputa entre Turma A e Turma B chega ao pátio principal às vésperas da votação, com direito a discursos, panfletos e um confronto no telhado.',
  'Rin Amasawa',
  '3 de agosto',
  '6 min',
  '報',
  array[
    'A campanha para o novo Conselho Estudantil de Gakuran entrou em sua fase mais tensa nesta semana, com as duas candidaturas favoritas — lideradas por representantes da Turma A e da Turma B — disputando espaço literal e simbólico dentro do colégio.',
    'Testemunhas relatam que o momento de maior tensão aconteceu no intervalo do período da tarde, quando os dois grupos se encontraram no telhado — território historicamente neutro.',
    'Apesar do clima pesado, ambas as chapas mantêm o discurso oficial de campanha limpa. A votação está marcada para sexta-feira, no pátio principal.'
  ],
  true
),
(
  'entrevista-autora-arco-vila-turma-b',
  'Entrevistas',
  'Conversa com a autora do arco mais comentado do semestre',
  'A intérprete por trás da rival da Turma B fala sobre construir uma antagonista sem virar caricatura.',
  'Kaito Serizawa',
  '29 de julho',
  '8 min',
  '話',
  array[
    'Poucos arcos dividiram tanto a comunidade quanto o confronto entre a vice-presidente do conselho e a nova aluna transferida da Turma B.',
    'Eu queria uma vilã que as pessoas entendessem antes de odiarem, explica a intérprete responsável pela personagem.'
  ],
  false
),
(
  'guia-como-entrar-para-a-redacao',
  'Comunidade',
  'Guia rápido: como entrar para a redação do jornal dentro do RP',
  'Quer que seu personagem escreva para o Nishiran? Veja como funciona a dinâmica de pautas dentro da história.',
  'Equipe Nishiran',
  '24 de junho',
  '4 min',
  '案',
  array[
    'O Nishiran é o jornal escolar oficial dentro da narrativa de Gakuran, e qualquer personagem pode propor pauta.',
    'Personagens interessados podem procurar a redação nos corredores ou deixar recado direto com a equipe do servidor.'
  ],
  false
)
on conflict (slug) do nothing;
