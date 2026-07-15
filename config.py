import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("NISHRAN_SECRET_KEY", "chave-de-redacao-troque-isto-em-producao")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "NISHRAN_DATABASE_URI", f"sqlite:///{os.path.join(BASE_DIR, 'nishran.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SITE_NAME = "Nishran"
    SITE_TAGLINE = "Jornal Estudantil de Nishikata High"
