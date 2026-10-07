from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0002_order_payment_screenshot"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="payment_email_sent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="order",
            name="dispatch_email_sent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
