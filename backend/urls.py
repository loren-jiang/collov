"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

from .api.views import index_view, CandidateViewSet, RatingViewSet

router = routers.DefaultRouter()
router.register('candidates', CandidateViewSet)
router.register('ratings', RatingViewSet)


urlpatterns = [

    path('', index_view, name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # this only serves media files during development
