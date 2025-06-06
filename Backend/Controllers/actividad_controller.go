package Controllers

import (
	Services "Backend/Services"
	"Backend/dto"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var actividadDto dto.ActividadDto

	actividadDto, err := Services.ActividadService.GetActividadById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, actividadDto)
}

func InsertActividad(c *gin.Context) {
	var actividadDto dto.ActividadDto
	err := c.BindJSON(&actividadDto)

	if err != nil {
		log.Error("Error al parsear el JSON: ", err)
		c.JSON(http.StatusBadRequest, "Datos inválidos")
		return
	}

	actividadDto, apiErr := Services.ActividadService.InsertActividad(actividadDto)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusCreated, actividadDto)
}

func ModificarActividad(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "ID inválido")
		return
	}

	var req struct {
		Campo string      `json:"campo"`
		Valor interface{} `json:"valor"`
	}
	if err := c.BindJSON(&req); err != nil {
		log.Error("Error al parsear el JSON: ", err)
		c.JSON(http.StatusBadRequest, "Datos inválidos")
		return
	}

	apiErr := Services.ActividadService.ModificarActividad(id, req.Campo, req.Valor)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad modificada con éxito"})
}

func DeleteActividad(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, "ID inválido")
		return
	}

	apiErr := Services.ActividadService.DeleteActividad(id)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad borrada con éxito"})
}

func GetActividadDisponible(c *gin.Context) {
	actividades, apiErr := Services.ActividadService.GetActividadDisponible()
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}
	c.JSON(http.StatusOK, actividades)
}
