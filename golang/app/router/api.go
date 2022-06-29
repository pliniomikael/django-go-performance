package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pliniomikael/django-go-performance/golang/app/controller"
	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)


func SetupAPIRoutes(app *config.Application, apiRouter fiber.Router) {

	apiRouter.Get("/ping", controller.PingController)
	apiRouter.Get("/pong/:message", controller.PongController)
	pokemons := apiRouter.Group("/pokemons")

	pokemons.Get("/:name", func(c *fiber.Ctx) error {
		return controller.GetPokemon(app, c)})

	pokemons.Get("/", func(c *fiber.Ctx) error {
		return controller.GetPokemons(app, c)})



}
