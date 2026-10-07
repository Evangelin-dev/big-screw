import os
import smtplib
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")
user = os.getenv("SMTP_USER", "").strip()
password = os.getenv("SMTP_PASSWORD", "").replace(" ", "")

if not user or not password:
    raise SystemExit(
        "SMTP_USER and SMTP_PASSWORD are required. Set them in backend/.env "
        "or in the process environment."
    )

for port in (587, 465):
    try:
        if port == 465:
            s = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=20)
        else:
            s = smtplib.SMTP("smtp.gmail.com", 587, timeout=20)
            s.starttls()
        s.login(user, password)
        print(port, "LOGIN OK")
        s.quit()
    except Exception as e:
        print(port, "FAILED:", type(e).__name__, str(e))