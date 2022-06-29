package controller

import (
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/pliniomikael/django-go-performance/golang/app/models"
	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)


func GetPokemons(app *config.Application, c *fiber.Ctx) error {
	pokemons := []models.Pokemon{}
	query := app.DB.Scripts.Get("POKEMONS")
	err := app.DB.Client.Select(&pokemons, query)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Pokemons not found")
	}
	return c.Status(fiber.StatusOK).JSON(&pokemons)
}

// func GetPokemon(app *config.Application, c *fiber.Ctx) error {
// 	name:= c.Params("name")
// 	pokemon := models.DetailPokemon{}
// 	query := app.DB.Scripts.Get("POKEMON_NAME")

// 	err := app.DB.Client.Get(&pokemon, query, name)
// 	fmt.Printf(err.Error())
// 	if err != nil {
// 		return fiber.NewError(fiber.StatusNotFound, "Pokemon not found")
// 	}
// 	return c.Status(fiber.StatusOK).JSON(&pokemon)
// }


func GetPokemon(app *config.Application, c *fiber.Ctx) error {
	name:= c.Params("name")
	pokemon := models.DetailPokemon{}
	query := app.DB.Scripts.Get("POKEMON_NAME")
	rows, err := app.DB.Client.Query(query, name)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Query Error")
	}
	for rows.Next() {
		var abilitiesJson []byte
		if err := rows.Scan(&pokemon.ID, &pokemon.Name, &abilitiesJson); err != nil {
			fmt.Printf(err.Error())
			return fiber.NewError(fiber.StatusNotFound, "Pokemon not found")
		}
		err = json.Unmarshal(abilitiesJson, &pokemon.Abilities)
		// runtime error: invalid memory address or nil pointer dereference
		if err == nil {
			fmt.Printf(err.Error())
			return fiber.NewError(fiber.StatusNotFound, "Error Unmarshal")
		}
	}
	fmt.Printf(err.Error())
	return c.Status(fiber.StatusOK).JSON(&pokemon)
}
