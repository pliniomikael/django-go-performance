SELECT
pokemon.id,
pokemon.name,
(SELECT
  json_agg(json_build_object(
    'id', ability.id,
    'name', ability.name
  ))
  FROM pokemon_ability as ability
  WHERE ability.pokemon_id = pokemon.id) as abilities
FROM pokemon_pokemon as pokemon
WHERE pokemon.name = $1


-- SELECT
-- pokemon.id,
-- pokemon.name,
-- (SELECT
--   json_agg(json_build_object(
--     'id', ability.id,
--     'name', ability.name
--   ))
--   FROM pokemon_ability as ability
--   WHERE ability.pokemon_id = pokemon.id) as abilities
-- FROM pokemon_pokemon as pokemon
-- WHERE pokemon.name = $1
