from django.http import JsonResponse
# from datetime import datetime
import httpx

API_BASE = 'http://localhost:8080/api/v1'

def pokemons_golang(request):
  resp = httpx.get(API_BASE + '/pokemons/').json()
  return JsonResponse(resp, safe=False)

def pokemon_golang(request, pokemon_name):
  resp = httpx.get(f'{API_BASE}/pokemons/{pokemon_name}').json()
  return JsonResponse(resp, safe=False)
