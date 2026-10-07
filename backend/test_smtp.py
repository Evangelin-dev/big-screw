import os, smtplib
from dotenv import load_dotenv

load_dotenv()
user = os.getenv("SMTP_USER")
pw = os.getenv("SMTP_PASSWORD", "").replace(" ", "")

for port in (587, 465):
    try:
        if port == 465:
            s = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=20)
        else:
            s = smtplib.SMTP("smtp.gmail.com", 587, timeout=20)
            s.starttls()
        s.login(user, pw)
        print(port, "LOGIN OK")
        s.quit()
    except Exception as e:
        print(port, "FAILED:", repr(e))