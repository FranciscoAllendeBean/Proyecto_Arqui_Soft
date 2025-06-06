package Controllers

import (
	"Backend/Models"
	Services "Backend/Services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CrearInscripcion(c *gin.Context) {
	var inscripcion Models.Inscripcion
	if err := c.BindJSON(&inscripcion); err != nil {
		c.JSON(http.StatusBadRequest, "Datos inválidos")
		return
	}

	apiErr := Services.InscripcionService.CrearInscripcion(inscripcion)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Inscripción creada con éxito"})
}

func GetActividadesPorUsuario(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("usuarioid"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "ID de usuario inválido")
		return
	}

	actividades, apiErr := Services.InscripcionService.GetActividadesPorUsuario(id)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusOK, actividades)
}
