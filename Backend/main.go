package main

import (
	_ "Backend/DB"
	"Backend/routers"
	"fmt"
)

func main() {
	router := routers.SetupRouter()
	router.Run(":8080")
	fmt.Println("Inicializando rutas")
}
