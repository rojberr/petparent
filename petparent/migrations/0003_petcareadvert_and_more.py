# Generated by Django 4.0.5 on 2023-01-12 21:55

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('petparent', '0002_post_hoteloffer_petforadoptionoffer_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PetCareAdvert',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='petparent.post')),
                ('date_from', models.DateField(default=datetime.datetime(2023, 1, 14, 21, 55, 26, 154802, tzinfo=utc))),
                ('date_to', models.DateField(default=datetime.datetime(2023, 1, 17, 21, 55, 26, 154823, tzinfo=utc))),
            ],
            bases=('petparent.post',),
        ),
        migrations.RenameModel(
            old_name='PetForAdoptionOffer',
            new_name='PetAdoptionAdvert',
        ),
        migrations.RemoveField(
            model_name='requestforpetsitter',
            name='post_ptr',
        ),
        migrations.DeleteModel(
            name='HotelOffer',
        ),
        migrations.DeleteModel(
            name='RequestForPetSitter',
        ),
    ]