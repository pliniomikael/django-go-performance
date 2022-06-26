import requests
import json

from pokemon.models import Pokemon, Ability, Type
from rich.console import Console
console = Console()

def BasePokemons():
	with open('extractor/pokemon.json') as json_data:
		data = json.load(json_data)

	Pokemon.objects.bulk_create([Pokemon(**poke) for poke in data])
	console.print("All Registered Pokemons")

def PokemonsAbilityType():
	pokemons = Pokemon.objects.all()
	for poke in pokemons:
		api_request = requests.get('https://pokeapi.co/api/v2/pokemon/%s' % (poke.name)).json()
		for ability in api_request['abilities']:
			Ability.objects.get_or_create(pokemon=poke, name=ability['ability']['name'])
		for type in api_request['types']:
			poke_type = Type.objects.get_or_create(name=type['type']['name'])
			poke_type[0].pokemon.add(poke)
			
		console.print("Pokemon %s" % (poke.name))


   