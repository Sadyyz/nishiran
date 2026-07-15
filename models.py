import re
import unicodedata
from datetime import datetime

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^\w\s-]", "", value).strip().lower()
    return re.sub(r"[-\s]+", "-", value)


class Author(UserMixin, db.Model):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(60), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.String(60), default="Repórter")
    bio = db.Column(db.Text, default="")
    avatar_url = db.Column(db.String(300), default="")
    is_editor_chefe = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    articles = db.relationship("Article", backref="author", lazy=True)

    def set_password(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def can_edit(self, article: "Article") -> bool:
        return self.is_editor_chefe or article.author_id == self.id


class Article(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(220), unique=True, nullable=False)
    subtitle = db.Column(db.String(300), default="")
    cover_image = db.Column(db.String(400), default="")
    content = db.Column(db.Text, nullable=False)
    tags = db.Column(db.String(300), default="")
    published = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), nullable=False)

    def tag_list(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]

    def case_number(self):
        return f"ARQUIVO Nº {self.id:03d}"
