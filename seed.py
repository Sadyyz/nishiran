"""Popula o banco com jornalistas e matérias de exemplo.

Rode com: python seed.py
"""
from app import app
from models import Article, Author, db, slugify

SAMPLE_ARTICLES = [
    dict(
        title="Cantina de Nishikata High é flagrada reutilizando arroz da semana passada",
        subtitle="Investigação de três semanas revela rotina suspeita na cozinha do refeitório",
        tags="investigação, cantina, exclusivo",
        cover_image="",
        content=(
            "Uma apuração conduzida pela redação do **Nishran** ao longo de três semanas "
            "identificou um padrão irregular na cantina de Nishikata High: potes de arroz "
            "marcados com etiquetas de segunda-feira reaparecendo nas bandejas de sexta-feira.\n\n"
            "Funcionários ouvidos sob anonimato confirmam que a prática existe \"há pelo menos "
            "dois semestres\" e que reclamações informais nunca chegaram à direção.\n\n"
            "A direção da escola foi procurada e respondeu por nota que vai \"averiguar o caso "
            "internamente\". O Nishran continuará acompanhando a apuração."
        ),
    ),
    dict(
        title="Grêmio estudantil aprova verba para reforma da quadra, mas obra não sai do papel",
        subtitle="Recursos aprovados há dois meses seguem sem uso e sem explicação oficial",
        tags="grêmio, infraestrutura",
        cover_image="",
        content=(
            "Documentos obtidos pelo Nishran mostram que o grêmio estudantil aprovou, em "
            "reunião de conselho, o uso de parte da verba anual para reformar a quadra poliesportiva.\n\n"
            "Passados dois meses, nenhuma obra foi iniciada. Procurada, a diretoria do grêmio "
            "afirmou que o processo está em fase de \"cotação de fornecedores\", mas não "
            "apresentou cronograma."
        ),
    ),
    dict(
        title="Perfil: a rotina do zelador que conhece Nishikata High melhor que ninguém",
        subtitle="Há 22 anos na escola, Seu Tanaka já viu quatro diretores passarem pelo cargo",
        tags="perfil, comunidade",
        cover_image="",
        content=(
            "Antes das sete da manhã, quando os corredores de Nishikata High ainda estão "
            "vazios, Seu Tanaka já percorreu cada ala do prédio.\n\n"
            "Em conversa com o Nishran, ele relembra mudanças na escola ao longo de mais de "
            "duas décadas de trabalho e reflete sobre o que, na sua visão, nunca muda: "
            "\"O nervosismo dos alunos na semana de provas é sempre igual.\""
        ),
    ),
]


def run():
    with app.app_context():
        db.create_all()

        if not Author.query.filter_by(username="editora-chefe").first():
            chefe = Author(
                name="Haru Ishikawa",
                username="editora-chefe",
                slug=slugify("Haru Ishikawa"),
                role="Editora-chefe",
                bio="Fundadora do Nishran. Cobre pauta institucional e investigativa de Nishikata High.",
                is_editor_chefe=True,
            )
            chefe.set_password("nishran2026")
            db.session.add(chefe)

        if not Author.query.filter_by(username="reporter").first():
            reporter = Author(
                name="Ren Kobayashi",
                username="reporter",
                slug=slugify("Ren Kobayashi"),
                role="Repórter",
                bio="Cobre grêmio estudantil, esportes e vida escolar em Nishikata High.",
            )
            reporter.set_password("nishran2026")
            db.session.add(reporter)

        db.session.commit()

        chefe = Author.query.filter_by(username="editora-chefe").first()
        reporter = Author.query.filter_by(username="reporter").first()
        autores = [chefe, reporter, chefe]

        for data, autor in zip(SAMPLE_ARTICLES, autores):
            if Article.query.filter_by(slug=slugify(data["title"])).first():
                continue
            article = Article(
                title=data["title"],
                slug=slugify(data["title"]),
                subtitle=data["subtitle"],
                cover_image=data["cover_image"],
                content=data["content"],
                tags=data["tags"],
                published=True,
                author_id=autor.id,
            )
            db.session.add(article)

        db.session.commit()
        print("Banco populado com sucesso.")
        print("Login editora-chefe -> usuário: editora-chefe | senha: nishran2026")
        print("Login repórter      -> usuário: reporter       | senha: nishran2026")


if __name__ == "__main__":
    run()
