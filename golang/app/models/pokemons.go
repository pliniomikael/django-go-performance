package models

type Pokemon struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
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
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Abilities []AbilitiePokemon `json:"abilities"`
	Typies []TypePokemon `json:"typies"`
}
