package clients

import (
	"Backend/Models"

	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

func CrearUsuario(usuario Models.Usuario) error {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(usuario.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	usuario.Password = string(hashedPassword)

	result := Db.Create(&usuario)

	if result.Error != nil {
		log.Error("Error creando el usuario: ", result.Error)
		return result.Error
	}

	log.Info("Usuario creada con éxito: ", usuario)
	return nil
}

func Login(user string, password string) (bool, error) {
	var usuario Models.Usuario

	result := Db.Where("user = ?", user).First(&usuario)
	if result.Error != nil {
		log.Error("Usuario no encontrado: ", result.Error)
		return false, result.Error
	}

	if err := bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(password)); err != nil {
		log.Warn("Contraseña incorrecta para el usuario: ", user)
		return false, nil
	}

	log.Info("Login exitoso para el usuario: ", user)
	return true, nil
}

func GetByUser(user string) (*Models.Usuario, error) {
	var usuario Models.Usuario
	result := Db.Where("user = ?", user).First(&usuario)
	if result.Error != nil {
		return nil, result.Error
	}
	return &usuario, nil
}
