# Generated by Django 4.1.4 on 2023-01-15 21:54

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('petparent', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PetCareAdvert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Tytuł ogłoszenia', max_length=100)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('offer_description', models.TextField(help_text='Cel ogłoszenia')),
                ('contact_info', models.CharField(help_text='+48-600-500-400', max_length=100)),
                ('location', models.CharField(blank=True, help_text='ul.Kazimierza Wielkiego 21, Warszawa', max_length=100, null=True)),
                ('date_from', models.DateField(default=datetime.date(2023, 1, 17), help_text='04.10.2023')),
                ('date_to', models.DateField(default=datetime.date(2023, 1, 20), help_text='08.10.2023')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'pet_care_advert',
                'ordering': ['-date_posted'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PetAdoptionAdvert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Tytuł ogłoszenia', max_length=100)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('offer_description', models.TextField(help_text='Cel ogłoszenia')),
                ('contact_info', models.CharField(help_text='+48-600-500-400', max_length=100)),
                ('location', models.CharField(blank=True, help_text='ul.Kazimierza Wielkiego 21, Warszawa', max_length=100, null=True)),
                ('animal_description', models.TextField(help_text='Rasa, wiek, charakter, szczególne potrzeby, ulubiony sposób spędzania czasu')),
                ('pet_photo', models.ImageField(blank=True, default='hamster.jpeg', upload_to='pet_photos/')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'pet_adoption_advert',
                'ordering': ['-date_posted'],
                'abstract': False,
            },
        ),
    ]
