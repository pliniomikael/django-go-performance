export interface Pokemon {
	id: number;
	name: string;
	image?: string;
}

export interface ResponsePokemons {
	previous_page?: number;
	next_page?: number;
	num_pages?: number;
	total_itens: number;
	pokemons: Pokemon[];
}
