package models

type Pokemon struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Image string `json:"image"`
}

type AbilitiePokemon struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
}

type TypePokemon struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
}
type DetailPokemon struct {
	Pokemon
	Abilities []AbilitiePokemon `json:"abilities"`
	Typies []TypePokemon `json:"typies"`
}
