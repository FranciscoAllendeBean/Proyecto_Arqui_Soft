package clients

import (
	"Backend/Models"

	log "github.com/sirupsen/logrus"
)

func CrearInscripcion(inscripcion Models.Inscripcion) error {
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

	err := Db.Joins("JOIN inscripcions ON inscripcions.actividadid = actividads.id").
		Where("inscripcions.usuarioid = ?", usuarioid).
		Find(&actividades).Error

	if err != nil {
		log.Error("Error obteniendo actividades inscriptas: ", err)
		return nil, err
	}

	return actividades, nil
}
