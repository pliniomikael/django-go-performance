SELECT
pokemon.id,
pokemon.name,
(SELECT
  json_agg(json_build_object(
    'id', ability.id,
    'name', ability.name
  ))
  FROM pokemon_ability as ability
  WHERE ability.pokemon_id = pokemon.id) as abilities,
(SELECT
  json_agg(json_build_object(
    'id', pokemon_type.id,
    'name', pokemon_type.name
    ))
    FROM pokemon_type_pokemon
    INNER JOIN pokemon_type
    ON pokemon_type.id = pokemon_type_pokemon.type_id
    WHERE pokemon_type_pokemon.pokemon_id = pokemon.id) as typies
FROM pokemon_pokemon as pokemon
WHERE pokemon.name = $1
