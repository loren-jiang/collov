from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework import viewsets
from rest_framework import permissions
from .models import Candidate, CandidateSerializer, Rating, RatingSerializer

# Serve entry point for Vue app
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class CandidateViewSet(viewsets.ModelViewSet):
    """
    API endpoint for candidates; admin priveleges needed for post, put
    """

    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,] #TODO: user login if time

class RatingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for ratings; admin priveleges needed for post, put
    """

    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,]