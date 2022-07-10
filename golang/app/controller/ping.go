package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Ping struct{
	Message string `json:"message" example:"sucesso"`
}

type Pong struct{
	Message string `json:"message" example:"super sucesso"`
}

func PingController(c *gin.Context) {
	Ping := Ping{"Deu tudo certo, Vai de Promo!"}
	c.JSON(http.StatusOK, gin.H{
		"message": Ping,
	})
}


func PongController(c *gin.Context) {
	c.JSON(http.StatusOK, Pong{
		Message: c.Param("message"),
	})
}
