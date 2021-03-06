# Generated by Django 3.2.9 on 2021-11-18 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailOtp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, default=False, max_length=254, unique=True)),
                ('otp', models.CharField(blank=True, max_length=9, null=True)),
                ('count', models.IntegerField(default=0, help_text='Number of opt_sent')),
                ('updated_date', models.DateTimeField(auto_now=True, verbose_name='date_published')),
            ],
        ),
    ]
