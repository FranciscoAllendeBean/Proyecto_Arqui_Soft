package routers

import (
	"Backend/Controllers"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("tu_clave_secreta")

func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(401, gin.H{"error": "Token requerido"})
			c.Abort()
			return
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil || !token.Valid {
			c.JSON(401, gin.H{"error": "Token inválido"})
			c.Abort()
			return
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || claims["role"] != "admin" {
			c.JSON(403, gin.H{"error": "Solo administradores"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/actividades/:id", Controllers.GetActividadById)
	auth := router.Group("/")
	auth.Use(AdminMiddleware())
	{
		auth.POST("/actividades", Controllers.InsertActividad)
		auth.PUT("/actividades/:id", Controllers.ModificarActividad)
		auth.DELETE("/actividades/:id", Controllers.DeleteActividad)
	}
	router.GET("/actividades/disponibles", Controllers.GetActividadDisponible)

	router.POST("/inscripciones", Controllers.CrearInscripcion)
	router.GET("/usuarios/:usuarioid/actividades", Controllers.GetActividadesPorUsuario)

	router.POST("/usuarios", Controllers.CrearUsuario)
	router.POST("/login", Controllers.Login)

	return router
}
