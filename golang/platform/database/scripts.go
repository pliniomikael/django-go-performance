package database

import (
	"embed"
	"errors"
	"io/fs"
	"strings"

	"github.com/rs/zerolog/log"
)

type Scripts map[string]string

func (s *Scripts) Get(script string) string {
	return (*s)[script]
}

const dir = "scripts"

//go:embed scripts/*
var scriptsFS embed.FS

// LOAD ALL FILES
func LoadSQLScripts() (*Scripts, error) {
	scripts := make(Scripts)

	files, _ := fs.ReadDir(scriptsFS, dir)
	for _, script := range files {
		name := script.Name()
		cleanName := strings.Split(name, ".")[0]

		if len(scripts[cleanName]) > 0 {
			log.Error().Msgf("Script name collision")
			return nil, errors.New("Script name collision")
		}

		file, _ := scriptsFS.ReadFile(dir + "/" + name)
		scripts[cleanName] = string(file)
	}

	return &scripts, nil
}
