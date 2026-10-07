import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# ───────── Core ─────────
DEBUG = os.environ.get("DEBUG", "True") == "True"
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-only-change-me-before-deploying")
if not DEBUG and SECRET_KEY.startswith("dev-only"):
    raise RuntimeError("Set a real SECRET_KEY in .env for production.")

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    # your app
    "shop",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # must be first
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# ───────── Uploaded files (payment screenshots) ─────────
# NEW: without these, uploads are served from "/payments/..." instead of "/media/payments/..."
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ───────── API ─────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["rest_framework.authentication.TokenAuthentication"],
    "DEFAULT_THROTTLE_RATES": {"login": "5/min", "anon": "60/min"},
}

# Only FRONTEND origins go here (the browser's origin), never the Django port.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://www.bigscrew.in",
    "https://bigscrew.in",
]

# ───────── Shop / UPI ─────────
UPI_ID = os.environ.get("UPI_ID", "test@upi")  # set your real UPI ID in .env
UPI_PAYEE_NAME = os.environ.get("UPI_PAYEE_NAME", "BigScrew Solutions")
GST_PERCENT = 0
PAYMENT_WINDOW_MINUTES = 10

# ───────── Email ─────────
EMAIL_CONSOLE = os.environ.get("EMAIL_CONSOLE", "False").strip().lower() == "true"
if EMAIL_CONSOLE:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.environ.get("SMTP_PORT", "587"))
EMAIL_USE_SSL = EMAIL_PORT == 465
EMAIL_USE_TLS = not EMAIL_USE_SSL
EMAIL_HOST_USER = os.environ.get("SMTP_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("SMTP_PASSWORD", "").replace(" ", "")  # spaces removed automatically
EMAIL_TIMEOUT = 15  # stops a blocked SMTP connection from freezing checkout

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "bigscrew26@gmail.com")
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER or ADMIN_EMAIL
ADMIN_NOTIFY_EMAIL = ADMIN_EMAIL

# Show email success/errors in the terminal
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "loggers": {"shop": {"handlers": ["console"], "level": "INFO"}},
}

# ───────── Production-only security (skipped on localhost) ─────────
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True