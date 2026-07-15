# Nishran — Jornal Estudantil de Nishikata High

Base completa de blog/jornal em **Flask + SQLite**, com redação (login para jornalistas),
publicação de matérias em Markdown e tags livres. Visual escuro, estilo jornal investigativo.

## Estrutura de arquivos

```
nishran/
├── app.py                  # rotas (site público + painel da redação)
├── models.py                # modelos Author (jornalista) e Article (matéria)
├── config.py                 # configuração (chave secreta, banco de dados)
├── seed.py                    # popula o banco com 2 jornalistas e 3 matérias de exemplo
├── requirements.txt
├── templates/
│   ├── base.html              # masthead, navegação por tags, rodapé
│   ├── index.html             # capa: destaque + grade de matérias
│   ├── article.html           # matéria completa
│   ├── tag.html                # listagem por tag/editoria
│   ├── author.html             # perfil público do jornalista
│   ├── login.html              # login da redação
│   └── admin/
│       ├── dashboard.html      # painel: lista de matérias, editar/excluir
│       └── article_form.html   # formulário de nova matéria / edição
└── static/
    ├── css/style.css           # todo o visual do site
    └── js/main.js
```

## Como rodar localmente

```bash
cd nishran
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python seed.py                  # cria o banco e popula com dados de exemplo
python app.py                   # inicia o servidor em http://127.0.0.1:5000
```

### Contas de exemplo criadas pelo `seed.py`

| Usuário          | Senha        | Papel          |
|-------------------|--------------|----------------|
| `editora-chefe`   | `nishran2026`| Editora-chefe (vê e edita todas as matérias) |
| `reporter`        | `nishran2026`| Repórter (vê e edita só as próprias matérias) |

**Troque essas senhas antes de usar com jornalistas de verdade.** Isso é feito diretamente
no banco (ou você pode criar uma tela de "trocar senha" depois — não veio pronta nesta base).

## Como funciona

- **Capa (`/`)**: mostra a matéria mais recente em destaque e o restante em grade.
- **Matéria (`/materia/<slug>`)**: texto completo, escrito em Markdown pelo jornalista.
- **Tags (`/tag/<tag>`)**: cada jornalista digita as próprias tags (separadas por vírgula)
  ao publicar. Elas viram links automaticamente e aparecem no menu do topo.
- **Perfil do jornalista (`/jornalista/<slug>`)**: nome, cargo, bio e lista de matérias.
- **Painel da redação (`/painel`)**: só para jornalistas logados. Cada um vê e edita as
  próprias matérias; quem tem `is_editor_chefe = True` no banco vê e edita todas.
- **Rascunho vs. publicada**: toda matéria nasce como rascunho a menos que a caixa
  "Publicar imediatamente" seja marcada — dá pra escrever com calma antes de ir ao ar.

## Adicionando um novo jornalista

Ainda não existe tela de cadastro (por segurança, já que login controla quem publica).
Para adicionar alguém, rode um script rápido em `python` com o app carregado:

```python
from app import app
from models import Author, db, slugify

with app.app_context():
    novo = Author(
        name="Nome do Jornalista",
        username="usuario_de_login",
        slug=slugify("Nome do Jornalista"),
        role="Repórter",
        bio="Uma linha sobre a cobertura dele(a).",
    )
    novo.set_password("senha-temporaria")
    db.session.add(novo)
    db.session.commit()
```

## Próximos passos sugeridos (não incluídos nesta base)

- Upload de imagem de capa (hoje é só uma URL)
- Busca por texto
- Comentários dos leitores
- Newsletter / RSS

## Sobre o visual

Paleta escura de "sala de redação": grafite/carvão de fundo, vermelho de carimbo como
destaque, dourado como cor de crachá de imprensa. Cada matéria recebe um número de
arquivo (`ARQUIVO Nº 00X`) e as tags aparecem como carimbos tracejados — a ideia é
que o site pareça um arquivo de investigação estudantil, não um blog genérico.
