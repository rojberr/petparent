# Generated by Django 4.0.5 on 2023-01-12 19:18

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('petparent', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('offer_description', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_posted'],
            },
        ),
        migrations.CreateModel(
            name='HotelOffer',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='petparent.post')),
                ('date_from', models.DateField(default=django.utils.timezone.now)),
                ('date_to', models.DateField(default=datetime.datetime(2023, 1, 17, 19, 18, 54, 585036, tzinfo=utc))),
            ],
            bases=('petparent.post',),
        ),
        migrations.CreateModel(
            name='PetForAdoptionOffer',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='petparent.post')),
                ('animal_description', models.TextField()),
            ],
            bases=('petparent.post',),
        ),
        migrations.CreateModel(
            name='RequestForPetSitter',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='petparent.post')),
                ('date_from', models.DateField(default=datetime.datetime(2023, 1, 14, 19, 18, 54, 584821, tzinfo=utc))),
                ('date_to', models.DateField(default=datetime.datetime(2023, 1, 17, 19, 18, 54, 584846, tzinfo=utc))),
                ('animal_description', models.TextField()),
            ],
            bases=('petparent.post',),
        ),
    ]
