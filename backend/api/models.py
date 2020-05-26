from django.db import models
from django.core.files.storage import FileSystemStorage
from rest_framework import serializers

fs = FileSystemStorage(location='/media/uploads')

# ------- Models ---------


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
    email = models.EmailField(max_length=254)
    comments = models.TextField(default='')


class Rating(models.Model):
    rating = models.SmallIntegerField()
    Candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="ratings")


# ------- Serializers --------

class CandidateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Candidate
        fields = ('first_name', 'last_name', 'phone',
                  'address', 'email', 'comments', 'stage', 'resume', 'pk')
