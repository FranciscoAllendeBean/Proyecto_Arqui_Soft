package main

import (
	"Backend/routers"
)

func main() {
	router := routers.SetupRouter()
	router.Run(":8080")
}
