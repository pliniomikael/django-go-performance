package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/pliniomikael/django-go-performance/golang/app/router"
	"github.com/pliniomikael/django-go-performance/golang/platform/config"
	zlog "github.com/rs/zerolog/log"
)

func main() {
	// dot env
	if err := godotenv.Load(); err != nil {
		log.Fatal("failed to load .env file")
	}

	zlog.Debug().Msg("debug mode")

	app, err := config.SetupApplication()
	if err != nil {
		log.Fatal(err.Error())
	}

	router := router.SetupRouter(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	if errAppListen := router.Listen(fmt.Sprintf(":%s", port)); errAppListen != nil {
		log.Fatal("app failed to initialize")
	}

}
