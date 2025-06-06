package main

import (
	_ "Backend/DB"
	"Backend/routers"
)

func main() {
	router := routers.SetupRouter()
	router.Run(":8080")
}
