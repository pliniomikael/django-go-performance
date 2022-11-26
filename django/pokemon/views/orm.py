from pokemon.models import Pokemon

from django.http import JsonResponse
from django.views.decorators.http import require_GET

# from datetime import datetime


@require_GET
def pokemons_orm(request):
    # start = datetime.now()
    pokemons = Pokemon.objects.all()
    data = [pokemon.to_dict() for pokemon in pokemons]
    # difference = datetime.now() - start
    # print(difference)
    return JsonResponse({"data": data})


@require_GET
def pokemon_orm(request, pokemon_name):
    # start = datetime.now()
    try:
        pokemon = Pokemon.objects.get(name=pokemon_name)
    except Pokemon.DoesNotExist:
        return JsonResponse({"message": "Pokemon not exists"}, status=404)
    data = pokemon.detail_to_dict()
    # difference = datetime.now() - start
    # print(difference)
    return JsonResponse({"data": data})
