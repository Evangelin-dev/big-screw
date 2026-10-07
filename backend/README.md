# BigScrew backend (Django + PostgreSQL)

## Setup
```bash
python -m venv venv
venv\Scripts\activate          # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env         # Mac/Linux: cp .env.example .env  -> then edit it
```
Create the database in PostgreSQL:  `CREATE DATABASE bigscrew;`

## Run
```bash
python manage.py makemigrations shop
python manage.py migrate
python manage.py createsuperuser      # your admin login
python manage.py runserver 0.0.0.0:8000
```
- Django admin (add products): http://localhost:8000/django-admin/
- API base: http://localhost:8000/api/

Load existing products: `python manage.py seed_products products.json`
(copy `products.example.json` and edit it; slugs must match the frontend).

## API
| Method | URL | Who |
|---|---|---|
| GET | /api/products/, /api/products/<slug>/ | public |
| POST | /api/orders/ | public (create order) |
| GET | /api/orders/<order_id>/ | public (payment page) |
| POST | /api/orders/<order_id>/pay/ | public, body `{"utr": "..."}` |
| POST | /api/admin/login/ | staff, returns token |
| GET | /api/admin/orders/ | admin (Authorization: Token ...) |
| PATCH | /api/admin/orders/<id>/ | admin, body `{"status": "paid"}` |
| GET/PATCH | /api/admin/products/<id>/ | admin (edit price/stock) |

Testing without Gmail: set `EMAIL_CONSOLE=True` in `.env`.
