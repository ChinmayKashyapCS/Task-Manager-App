import os
from datetime import timedelta


class Config:
    # =========================
    # BASIC CONFIG
    # =========================
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")

    # =========================
    # DATABASE CONFIG
    # =========================
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///app.db"   # default (fast for assignment)
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # =========================
    # JWT CONFIG
    # =========================
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    # =========================
    # OPTIONAL: DEBUG
    # =========================
    DEBUG = True


# =========================
# PRODUCTION CONFIG (OPTIONAL)
# =========================
class ProductionConfig(Config):
    DEBUG = False


# =========================
# DEVELOPMENT CONFIG
# =========================
class DevelopmentConfig(Config):
    DEBUG = True