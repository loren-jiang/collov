# Generated by Django 2.2.12 on 2020-05-26 07:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200526_0705'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rating',
            old_name='Candidate',
            new_name='candidate',
        ),
    ]
