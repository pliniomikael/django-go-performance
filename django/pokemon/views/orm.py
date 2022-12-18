from pokemon.models import Pokemon

from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

# from django.views.decorators.cache import cache_page


@require_GET
def pokemons_orm(request):
    pokemons = Pokemon.objects.all()
    pokemons_serializer = [pokemon.to_dict() for pokemon in pokemons]
    paginator = Paginator(pokemons_serializer, 25) # Show 25 contacts per page.

    page_number = request.GET.get('page')
    try:
        objects = paginator.page(page_number)
    except PageNotAnInteger:
        objects = paginator.page(1)
    except EmptyPage:
        objects = paginator.page(paginator.num_pages)
    data = {
            'previous_page': objects.has_previous() and objects.previous_page_number() or None,
            'next_page': objects.has_next() and objects.next_page_number() or None,
            'data': list(objects)
        }
    return JsonResponse(data, safe=False)


@require_GET
def pokemon_orm(request, pokemon_name):
    try:
        pokemon = Pokemon.objects.get(name=pokemon_name)
    except Pokemon.DoesNotExist:
        return JsonResponse({"message": "Pokemon not exists"}, status=404)
    data = pokemon.detail_to_dict()

    return JsonResponse(data, safe=False)
