package controller

import (
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
