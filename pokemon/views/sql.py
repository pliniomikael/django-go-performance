from django.db import connections
from django.http import JsonResponse
from datetime import datetime

def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
# time 0:00:00.006207
def pokemons_sql(request):
  # start = datetime.now()
  query = """SELECT pokemon_pokemon.id, pokemon_pokemon.name, pokemon_pokemon.image FROM pokemon_pokemon"""
  conn = connections["default"]
  cursor = conn.cursor()
  cursor.execute(query)
  ref_row = dictfetchall(cursor)
  cursor.close()
  # print(datetime.now() - start)
  return JsonResponse(ref_row, safe=False)

# time 0:00:00.005946
def pokemon_sql(request, pokemon_name):
  # start = datetime.now()
  query = """SELECT
  pokemon.id,
  pokemon.name,
  pokemon.image,
  (SELECT
  array_agg(json_build_object(
    'id', ability.id,
    'name', ability.name
    )) as abilities
    FROM pokemon_ability as ability
    WHERE ability.pokemon_id = pokemon.id),
  (SELECT
  array_agg(json_build_object(
    'id', pokemon_type.id,
    'name', pokemon_type.name
    )) as typies
    FROM pokemon_type_pokemon
    INNER JOIN pokemon_type
    ON pokemon_type.id = pokemon_type_pokemon.type_id
    WHERE pokemon_type_pokemon.pokemon_id = pokemon.id)
  FROM pokemon_pokemon as pokemon
  WHERE pokemon.name = '{pokemon_name}'""".format(pokemon_name=pokemon_name)
  conn = connections["default"]
  cursor = conn.cursor()
  cursor.execute(query)
  ref_row = dictfetchall(cursor)
  cursor.close()
  # print(datetime.now() - start)
  return JsonResponse(ref_row, safe=False)
