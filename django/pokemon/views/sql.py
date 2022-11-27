from django.db import connection
from django.http import JsonResponse
from django.views.decorators.http import require_GET
# from django.views.decorators.cache import cache_page


def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


@require_GET
def pokemons_sql(request):
	query = """SELECT
		id, name, image
		FROM pokemon_pokemon
		ORDER BY id
		"""
	with connection.cursor() as cursor:
		cursor.execute(query)
		ref_row = dictfetchall(cursor)
	return JsonResponse(ref_row, safe=False)


@require_GET
def pokemon_sql(request, pokemon_name):
	query = """
	SELECT
		pokemon.id, pokemon.name, pokemon.image,
	array_agg(json_build_object(
		'id', ability.id,
		'name', ability.name
		)) as abilities,
	array_agg(json_build_object(
		'id', pokemon_type.id,
		'name', pokemon_type.name
		)) as typies
	FROM pokemon_pokemon as pokemon
		inner join pokemon_ability as ability
			on ability.pokemon_id = pokemon.id
		inner join pokemon_type_pokemon
			on pokemon_type_pokemon.pokemon_id = pokemon.id
		inner join pokemon_type
			ON pokemon_type.id = pokemon_type_pokemon.type_id
	WHERE pokemon.name = '{pokemon_name}'
	GROUP BY
	pokemon.id""".format(
		pokemon_name
	)
	with connection.cursor() as cursor:
		cursor.execute(query)
		ref_row = dictfetchall(cursor)
	return JsonResponse(ref_row, safe=False)
