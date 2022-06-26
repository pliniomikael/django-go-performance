package config

import (
	"github.com/pliniomikael/django-go-performance/golang/platform/database"
	"github.com/rs/zerolog"
)

type Application struct {
	DB  *database.DB
	Cfg *Config
}

func SetupApplication() (*Application, error) {
	cfg := Get()
	db, err := database.Get(cfg.GetDBConnStr())

	if err != nil {
		return nil, err
	}

	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	return &Application{
		DB:  db,
		Cfg: cfg,
	}, nil
}
