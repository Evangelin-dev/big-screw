"""Load products into the DB from a JSON file.

Usage:  python manage.py seed_products products.json

products.json format:
[
  {"slug": "screw-pile-76", "name": "Screw Pile 76mm", "price": 2500, "stock": 100,
   "description": "", "image_url": ""}
]
Existing slugs are updated; new ones are created.
"""
import json

from django.core.management.base import BaseCommand

from shop.models import Product


class Command(BaseCommand):
    help = "Create/update products from a JSON file"

    def add_arguments(self, parser):
        parser.add_argument("file")

    def handle(self, *args, **opts):
        with open(opts["file"], encoding="utf-8") as f:
            rows = json.load(f)
        for r in rows:
            slug = r.pop("slug")
            _, created = Product.objects.update_or_create(slug=slug, defaults=r)
            self.stdout.write(f"{'Created' if created else 'Updated'}: {slug}")
