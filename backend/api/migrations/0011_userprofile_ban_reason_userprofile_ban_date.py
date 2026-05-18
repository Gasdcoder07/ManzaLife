# Generated manually to fix missing fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_userprofile_is_banned_alter_systemrequest_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='ban_reason',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='ban_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
