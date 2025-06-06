package controllers

import (
	Services "Backend/Services"
	"Backend/dto"
	"net/http"

	//"strconv"

	"github.com/gin-gonic/gin"
)

func CrearUsuario(c *gin.Context) {
	var usuario dto.Usuariodto
	if err := c.BindJSON(&usuario); err != nil {
		c.JSON(http.StatusBadRequest, "Datos inválidos")
		return
	}

	apiErr := Services.UsuarioService.CrearUsuario(usuario)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Usuario creado con éxito"})
}

func Login(c *gin.Context) {
	var usuario dto.Usuariodto
	if err := c.BindJSON(&usuario); err != nil {
		c.JSON(http.StatusBadRequest, "Datos inválidos")
		return
	}

	ok, apiErr := Services.UsuarioService.Login(usuario.User, usuario.Password)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Credenciales inválidas"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Inicio de sesión exitoso"})
}
