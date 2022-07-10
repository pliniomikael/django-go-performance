package controller

import (
	"encoding/json"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/pliniomikael/django-go-performance/golang/app/models"
	"github.com/pliniomikael/django-go-performance/golang/platform/config"
)


func GetPokemons(app *config.Application, c *gin.Context) {
	pokemons := []models.Pokemon{}
	query := app.DB.Scripts.Get("POKEMONS")
	err := app.DB.Client.Select(&pokemons, query)
	if err != nil {
		c.JSON(http.StatusNotFound, "Pokemons not found")
	}
	c.JSON(http.StatusOK, &pokemons)
}


func GetPokemon(app *config.Application, c *gin.Context) {
	name:= c.Param("name")
	pokemon := models.DetailPokemon{}
	query := app.DB.Scripts.Get("POKEMON_NAME")
	rows := app.DB.Client.QueryRow(query, name)
	if rows == nil {
		c.JSON(http.StatusNotFound, "Query Error")
	}
	abilitiesJson := []byte{}
	if err := rows.Scan(&pokemon.ID, &pokemon.Name, &abilitiesJson); err != nil {
		c.JSON(http.StatusNotFound, "Pokemon não encontrado!")
	}
	err := json.Unmarshal(abilitiesJson, &pokemon.Abilities)
	if err != nil {
		c.JSON(http.StatusNotFound, "Error Unmarshal")
	}
	c.JSON(http.StatusOK , &pokemon)
}
