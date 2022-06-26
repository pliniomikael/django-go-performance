package router

import (
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)

func SetupRouter(app *config.Application) *fiber.App {
	// FIBER SETUP
	router := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
		AppName:     "Django Go Performance",
	})
	router.Use(logger.New())
	router.Use(recover.New())
	router.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowHeaders:  "Origin, Content-Type, Accept",
	}))

	// ROUTER GROUPS
	api := router.Group("/api")
	v1 := api.Group("/v1")
	{
		SetupAPIRoutes(app, v1)
	}

	return router
}
