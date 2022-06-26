package controller

import "github.com/gofiber/fiber/v2"

type Ping struct{
	Message string `json:"message" example:"sucesso"`
}

type Pong struct{
	Message string `json:"message" example:"super sucesso"`
}

func PingController(c *fiber.Ctx) error {
	Ping := Ping{"Deu tudo certo, Vai de Promo!"}
	return c.JSON(fiber.Map{
		"message": Ping,
	})}


func PongController(c *fiber.Ctx) error {
	return c.JSON(Pong{
		Message: c.Params("message"),
	})}