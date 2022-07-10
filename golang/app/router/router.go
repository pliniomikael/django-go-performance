package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/logger"
	"github.com/gin-gonic/gin"

	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)

func SetupRouter(app *config.Application) *gin.Engine {
	// gin SETUP
	router := gin.New()
	router.Use(logger.SetLogger())
	router.Use(gin.Recovery())
	router.Use(cors.New(cors.Config{
    AllowOrigins: []string{"*"},
    AllowHeaders:  []string{"Origin, Content-Type, Accept"},
	}))

	// ROUTER GROUPS
	api := router.Group("/api")
	v1 := api.Group("/v1")
	{
		SetupAPIRoutes(app, v1)
	}

	return router
}
