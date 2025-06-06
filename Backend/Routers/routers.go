package routers

import (
	"Backend/Controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/actividades/:id", Controllers.GetActividadById)
	router.POST("/actividades", Controllers.InsertActividad)
	router.PUT("/actividades/:id", Controllers.ModificarActividad)
	router.DELETE("/actividades/:id", Controllers.DeleteActividad)
	router.GET("/actividades/disponibles", Controllers.GetActividadDisponible)

	router.POST("/inscripciones", Controllers.CrearInscripcion)
	router.GET("/usuarios/:usuarioid/actividades", Controllers.GetActividadesPorUsuario)

	router.POST("/usuarios", Controllers.CrearUsuario)
	router.POST("/login", Controllers.Login)

	return router
}
