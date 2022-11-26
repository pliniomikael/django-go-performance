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
	WHERE pokemon.name = $1
	GROUP BY
	pokemon.id
