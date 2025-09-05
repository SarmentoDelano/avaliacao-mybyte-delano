from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    SimplesInSerializer,
    CompostosInSerializer,
    PresenteInSerializer,
)

@api_view(["GET"])
def health(_):
    return Response({"status": "ok"})

@api_view(["POST"])
def juros_simples(request):
    s = SimplesInSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

    C = s.validated_data["capital"]
    i = s.validated_data["taxa"] / 100.0
    t = s.validated_data["tempo"]

    J = C * i * t
    M = C + J

    return Response({
        "capital": round(C, 2),
        "taxa_percent": s.validated_data["taxa"],
        "tempo_meses": t,
        "juros": round(J, 2),
        "montante": round(M, 2),
        "formula": "J = C*i*t; M = C + J",
    })

@api_view(["POST"])
def juros_compostos(request):
    s = CompostosInSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

    C = s.validated_data["capital"]
    i = s.validated_data["taxa"] / 100.0
    t = s.validated_data["tempo"]

    M = C * (1 + i) ** t
    J = M - C

    return Response({
        "capital": round(C, 2),
        "taxa_percent": s.validated_data["taxa"],
        "tempo_meses": t,
        "montante": round(M, 2),
        "juros": round(J, 2),
        "formula": "M = C*(1+i)^t; J = M - C",
    })

@api_view(["POST"])
def valor_presente(request):
    s = PresenteInSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

    VF = s.validated_data["futuro"]
    i = s.validated_data["taxa"] / 100.0
    t = s.validated_data["tempo"]

    VP = VF / (1 + i) ** t

    return Response({
        "valor_futuro": round(VF, 2),
        "taxa_percent": s.validated_data["taxa"],
        "tempo_meses": t,
        "valor_presente": round(VP, 2),
        "formula": "VP = VF / (1+i)^t",
    })
