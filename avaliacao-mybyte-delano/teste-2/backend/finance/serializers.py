from rest_framework import serializers

class SimplesInSerializer(serializers.Serializer):
    capital = serializers.FloatField(min_value=0.01)
    taxa = serializers.FloatField(min_value=0.0)   # % ao mês
    tempo = serializers.FloatField(min_value=0.0)  # meses

class CompostosInSerializer(SimplesInSerializer):
    pass

class PresenteInSerializer(serializers.Serializer):
    futuro = serializers.FloatField(min_value=0.01)
    taxa = serializers.FloatField(min_value=0.0)   # % ao mês
    tempo = serializers.FloatField(min_value=0.0)  # meses
