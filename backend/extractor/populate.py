import json

import httpx
from pokemon.models import Ability, Pokemon, Type
from rich.console import Console

console = Console()


def BasePokemons():
    with open("django/extractor/pokemon.json") as json_data:
        data = json.load(json_data)

    Pokemon.objects.bulk_create([Pokemon(**poke) for poke in data])
    console.print("All Registered Pokemons")


def PokemonsDetails():
    for poke in Pokemon.objects.all():
        pokemon_url = f"https://pokeapi.co/api/v2/pokemon/{poke.name}"
        resp = httpx.get(pokemon_url).json()
        for ability in resp["abilities"]:
            Ability.objects.get_or_create(pokemon=poke, name=ability["ability"]["name"])
        for type in resp["types"]:
            poke_type = Type.objects.get_or_create(name=type["type"]["name"])
            poke_type[0].pokemon.add(poke)
        # breakpoint()
        poke.image = resp["sprites"]["other"]["home"]["front_default"]
        poke.save()
        console.print("Pokemon %s" % (poke.name))


def PokemonsImagesNone():
    for poke in Pokemon.objects.filter(image__isnull=True):
        pokemon_url = f"https://pokeapi.co/api/v2/pokemon/{poke.name}"
        resp = httpx.get(pokemon_url).json()
        if resp["sprites"]["other"]["home"]["front_default"]:
            poke.image = resp["sprites"]["other"]["home"]["front_default"]
        elif resp["sprites"]["other"]["official-artwork"]["front_default"]:
            poke.image = resp["sprites"]["other"]["official-artwork"]["front_default"]
        elif resp["sprites"]["front_default"]:
            poke.image = resp["sprites"]["front_default"]
        # elif resp['sprites']['front_default']:
        # 	poke.image = resp['sprites']['front_default']
        poke.save()
        console.print("Pokemon %s" % (poke.name))
