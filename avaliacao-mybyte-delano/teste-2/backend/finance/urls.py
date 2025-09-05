from django.urls import path
from . import views

urlpatterns = [
    path("health", views.health),
    path("juros-simples", views.juros_simples),
    path("juros-compostos", views.juros_compostos),
    path("valor-presente", views.valor_presente),
]
