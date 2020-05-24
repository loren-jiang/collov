from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework import viewsets
from rest_framework import permissions
from .models import Message, Candidate, CandidateSerializer, MessageSerializer

# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class CandidateViewSet(viewsets.ModelViewSet):
    """
    API endpoint for candidates; admin priveleges needed for post, put
    """

    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,]