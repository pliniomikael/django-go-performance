from pokemon.models import Pokemon

from django.http import JsonResponse
from django.views.decorators.http import require_GET

# from django.views.decorators.cache import cache_page


@require_GET
def pokemons_orm(request):
    pokemons = Pokemon.objects.all()
    data = [pokemon.to_dict() for pokemon in pokemons]

    return JsonResponse(data, safe=False)


@require_GET
def pokemon_orm(request, pokemon_name):
    try:
        pokemon = Pokemon.objects.get(name=pokemon_name)
    except Pokemon.DoesNotExist:
        return JsonResponse({"message": "Pokemon not exists"}, status=404)
    data = pokemon.detail_to_dict()

    return JsonResponse(data, safe=False)
