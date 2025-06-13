package Controllers

import (
	"Backend/Models"
	Services "Backend/Services"
	"Backend/dto"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func CrearUsuario(c *gin.Context) {
	var usuario Models.Usuario
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
		c.JSON(400, gin.H{"message": "Datos inválidos"})
		return
	}

	ok, apiErr := Services.UsuarioService.Login(usuario.User, usuario.Password)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}
	if !ok {
		c.JSON(401, gin.H{"error": "Credenciales inválidas"})
		return
	}

	// Obtener el usuario real desde la base de datos
	usuarioDB, err := Services.UsuarioService.GetByUser(usuario.User)
	if err != nil {
		c.JSON(500, gin.H{"error": "No se pudo obtener el usuario"})
		return
	}
	rol := usuarioDB.Role // Este es el rol real

	claims := jwt.MapClaims{
		"user": usuario.User,
		"role": rol,
		"exp":  time.Now().Add(time.Hour * 1).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("tu_clave_secreta"))
	if err != nil {
		c.JSON(500, gin.H{"error": "No se pudo generar el token"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Inicio de sesión exitoso",
		"token":   tokenString,
	})
}
