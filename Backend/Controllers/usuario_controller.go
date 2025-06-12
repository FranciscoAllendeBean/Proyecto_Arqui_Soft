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
		c.JSON(400, gin.H{"error": "Datos inválidos"})
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

	// Aquí deberías obtener el rol real del usuario desde la base de datos
	rol := usuario.Role // O "usuario", según corresponda

	claims := jwt.MapClaims{
		"user": usuario.User,
		"role": rol,
		"exp":  time.Now().Add(time.Hour * 1).Unix()}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("tu_clave_secreta"))
	if err != nil {
		c.JSON(500, gin.H{"error": "No se pudo generar el token"})
		return
	}

	c.JSON(200, gin.H{
		"mensaje": "Inicio de sesión exitoso",
		"token":   tokenString,
	})
}
