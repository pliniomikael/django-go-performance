# from datetime import datetime
import httpx

from django.http import JsonResponse

API_BASE = "http://localhost:8080/api/v1"

from django.views.decorators.http import require_GET


@require_GET
def pokemons_golang(request):
    with httpx.Client() as client:
        resp = client.get(API_BASE + "/pokemons/").json()
    return JsonResponse(resp, safe=False)


@require_GET
def pokemon_golang(request, pokemon_name):
    with httpx.Client() as client:
        resp = client.get(f"{API_BASE}/pokemons/{pokemon_name}").json()
    return JsonResponse(resp, safe=False)
