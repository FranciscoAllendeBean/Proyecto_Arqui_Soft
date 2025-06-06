package clients

import (
	"Backend/Models"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func CrearUsuario(usuario Models.usuario) error {
	result := Db.Create(&usuario)

	if result.Error != nil {
		log.Error("Error creando la actividad: ", result.Error)
		return result.Error
	}

	log.Info("Actividad creada con éxito: ", usuario)
	return nil
}

func Login(user string, password string) (bool, error) {
	var usuario Models.Usuario

	result := Db.Where("user = ?", user).First(&usuario)
	if result.Error != nil {
		log.Error("Usuario no encontrado: ", result.Error)
		return false, result.Error
	}

	if usuario.password != password {
		log.Warn("Contraseña incorrecta para el usuario: ", user)
		return false, nil
	}

	log.Info("Login exitoso para el usuario: ", user)
	return true, nil
}
