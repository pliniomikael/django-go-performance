package models

type Pokemon struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type DetailPokemon struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Abilities []struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	} `json:"abilities"`
	// Typies []struct {
	// 	ID   int    `json:"id"`
	// 	Name string `json:"name"`
	// } `json:"typies"`
}