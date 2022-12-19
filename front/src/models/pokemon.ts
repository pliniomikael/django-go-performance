export interface Pokemons {
	id: number;
	name: string;
	image?: string;
}

export interface ResponsePokemons {
	previous_page?: number;
	next_page?: number;
	num_pages?: number;
	pokemons: Pokemons[];
}
