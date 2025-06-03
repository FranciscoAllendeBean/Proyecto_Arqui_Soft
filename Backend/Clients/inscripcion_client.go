package clients

import (
	"Models"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func CrearInscripcion(inscripcion Models.inscripcion) error {
	result := Db.Create(&inscripcion)

	if result.Error != nil {
		log.Error("Error creando la inscripción: ", result.Error)
		return result.Error
	}

	log.Info("inscripción creada con éxito: ", inscripcion)
	return nil
}

func GetActividadesPorUsuario(usuarioid int) ([]Models.Actividad, error) {
	var actividades []Models.Actividad

	err := Db.Joins("JOIN inscripcion ON inscripcion.actividad_id = actividad.id").
		Where("inscripcion.usuario_id = ?", usuarioid).
		Find(&actividades).Error

	if err != nil {
		log.Error("Error obteniendo actividades inscriptas: ", err)
		return nil, err
	}

	return actividades, nil
}
