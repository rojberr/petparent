# Generated by Django 4.1.4 on 2023-01-23 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('petparent', '0006_alter_petcareadvert_date_from_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='petadoptionadvert',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='pet_photos/'),
        ),
    ]
