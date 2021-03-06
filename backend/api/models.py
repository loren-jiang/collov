from django.db import models
from rest_framework import serializers
from backend.storages import PublicMediaStorage

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
    resume = models.FileField(storage=PublicMediaStorage(), blank=True, null=True)
    email = models.EmailField(max_length=254)
    comments = models.TextField(default='')


class Rating(models.Model):
    rating = models.SmallIntegerField()
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="ratings")

    class Meta:
        def __str__(self):
            return str(self.rating)


# ------- Serializers --------

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('rating', 'candidate')


class CandidateSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Candidate
        fields = ('first_name', 'last_name', 'phone',
                  'address', 'email', 'comments', 'stage', 'resume', 'pk')
