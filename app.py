from datetime import datetime

import markdown as md
from flask import Flask, abort, flash, redirect, render_template, request, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from markupsafe import Markup

from config import Config
from models import Article, Author, db, slugify

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message = "Faça login para acessar a redação."
login_manager.login_message_category = "aviso"


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(Author, int(user_id))


@app.context_processor
def inject_globals():
    published = Article.query.filter_by(published=True).all()
    nav_tags = sorted({tag for a in published for tag in a.tag_list()}, key=str.lower)[:8]
    return {
        "site_name": app.config["SITE_NAME"],
        "site_tagline": app.config["SITE_TAGLINE"],
        "now": datetime.utcnow(),
        "all_tags": nav_tags,
    }


@app.template_filter("markdown")
def markdown_filter(text):
    return Markup(md.markdown(text or "", extensions=["extra", "nl2br"]))


@app.template_filter("data_br")
def data_br(value):
    if not value:
        return ""
    return value.strftime("%d/%m/%Y")


@app.template_filter("slugify")
def slugify_filter(value):
    return slugify(value)


# ---------- Site público ----------

@app.route("/")
def index():
    articles = (
        Article.query.filter_by(published=True)
        .order_by(Article.created_at.desc())
        .all()
    )
    destaque = articles[0] if articles else None
    resto = articles[1:] if len(articles) > 1 else []
    return render_template("index.html", destaque=destaque, articles=resto)


@app.route("/materia/<slug>")
def article_detail(slug):
    article = Article.query.filter_by(slug=slug).first_or_404()
    if not article.published and (not current_user.is_authenticated or not current_user.can_edit(article)):
        abort(404)
    relacionadas = (
        Article.query.filter(Article.id != article.id, Article.published.is_(True))
        .order_by(Article.created_at.desc())
        .limit(3)
        .all()
    )
    return render_template("article.html", article=article, relacionadas=relacionadas)


@app.route("/tag/<tag_slug>")
def tag_view(tag_slug):
    articles = Article.query.filter_by(published=True).order_by(Article.created_at.desc()).all()
    filtradas = [a for a in articles if tag_slug in [slugify(t) for t in a.tag_list()]]
    if not filtradas:
        abort(404)
    tag_nome = next(t for a in filtradas for t in a.tag_list() if slugify(t) == tag_slug)
    return render_template("tag.html", articles=filtradas, tag_nome=tag_nome)


@app.route("/jornalista/<slug>")
def author_profile(slug):
    author = Author.query.filter_by(slug=slug).first_or_404()
    articles = (
        Article.query.filter_by(author_id=author.id, published=True)
        .order_by(Article.created_at.desc())
        .all()
    )
    return render_template("author.html", author=author, articles=articles)


# ---------- Autenticação ----------

@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        user = Author.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for("dashboard"))
        flash("Credenciais inválidas. Confira usuário e senha.", "erro")
    return render_template("login.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


# ---------- Redação (painel administrativo) ----------

@app.route("/painel")
@login_required
def dashboard():
    if current_user.is_editor_chefe:
        articles = Article.query.order_by(Article.created_at.desc()).all()
    else:
        articles = (
            Article.query.filter_by(author_id=current_user.id)
            .order_by(Article.created_at.desc())
            .all()
        )
    return render_template("admin/dashboard.html", articles=articles)


@app.route("/painel/novo", methods=["GET", "POST"])
@login_required
def new_article():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        if not title:
            flash("O título é obrigatório.", "erro")
            return render_template("admin/article_form.html", article=None)
        base_slug = slugify(title)
        slug = base_slug
        i = 2
        while Article.query.filter_by(slug=slug).first():
            slug = f"{base_slug}-{i}"
            i += 1
        article = Article(
            title=title,
            slug=slug,
            subtitle=request.form.get("subtitle", "").strip(),
            cover_image=request.form.get("cover_image", "").strip(),
            content=request.form.get("content", ""),
            tags=request.form.get("tags", "").strip(),
            published=bool(request.form.get("published")),
            author_id=current_user.id,
        )
        db.session.add(article)
        db.session.commit()
        flash("Matéria salva na redação.", "sucesso")
        return redirect(url_for("dashboard"))
    return render_template("admin/article_form.html", article=None)


@app.route("/painel/editar/<int:article_id>", methods=["GET", "POST"])
@login_required
def edit_article(article_id):
    article = db.session.get(Article, article_id) or abort(404)
    if not current_user.can_edit(article):
        abort(403)
    if request.method == "POST":
        article.title = request.form.get("title", "").strip()
        article.subtitle = request.form.get("subtitle", "").strip()
        article.cover_image = request.form.get("cover_image", "").strip()
        article.content = request.form.get("content", "")
        article.tags = request.form.get("tags", "").strip()
        article.published = bool(request.form.get("published"))
        db.session.commit()
        flash("Matéria atualizada.", "sucesso")
        return redirect(url_for("dashboard"))
    return render_template("admin/article_form.html", article=article)


@app.route("/painel/excluir/<int:article_id>", methods=["POST"])
@login_required
def delete_article(article_id):
    article = db.session.get(Article, article_id) or abort(404)
    if not current_user.can_edit(article):
        abort(403)
    db.session.delete(article)
    db.session.commit()
    flash("Matéria excluída do arquivo.", "sucesso")
    return redirect(url_for("dashboard"))


if __name__ == "__main__":
    app.run(debug=True)
