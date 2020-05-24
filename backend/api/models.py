from django.db import models
from django.core.files.storage import FileSystemStorage
from rest_framework import serializers

fs = FileSystemStorage(location='/media/uploads')

# ------- Models --------


class Message(models.Model):
    subject = models.CharField(max_length=200)
    body = models.TextField()


class Candidate(models.Model):
    STAGES = (
        (u"AP", u"Applied"),
        (u"PS", u"Phone Screen"),
        (u"OS", u"On site"),
        (u"OF", u"Offered"),
        (u"AC", u"Accepted"),
        (u"RE", u"Rejected"),
    )

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    stage = models.CharField(max_length=2, choices=STAGES)
    resume = models.FileField(upload_to='uploads/', blank=True, null=True)


# ------- Serializers --------

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('url', 'subject', 'body', 'pk')


class CandidateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Candidate
        fields = ('first_name', 'last_name', 'phone', 'address', 'stage', 'resume', 'pk')
