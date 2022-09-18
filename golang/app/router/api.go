package router

import (
	"github.com/gin-gonic/gin"
	"github.com/pliniomikael/django-go-performance/golang/app/controller"
	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)


func SetupAPIRoutes(app *config.Application, apiRouter *gin.RouterGroup) {

	apiRouter.GET("/ping", controller.PingController)
	apiRouter.GET("/pong/:message", controller.PongController)

	pokemons := apiRouter.Group("/pokemons")

	pokemons.GET("/:name", func(c *gin.Context) {
		controller.GetPokemon(app, c)})
	pokemons.GET("/", func(c *gin.Context) {
		controller.GetPokemons(app, c)})

}
