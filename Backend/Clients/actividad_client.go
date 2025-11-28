package clients

import (
	"Backend/Models"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActividadById(id int) Models.Actividad {
	var actividad Models.Actividad

	Db.Where("id = ?", id).First(&actividad)
	log.Debug("Act: ", actividad)

	return actividad
}

func GetActividadDisponible() Models.Actividades {
	var Actividades Models.Actividades

	Db.Where("disponible = ?", true).Find(&Actividades)
	log.Debug("Act: ", Actividades)

	return Actividades
}

func DeleteActividad(id int) error {
	var actividad Models.Actividad

	result := Db.Where("id = ?", id).First(&actividad)
	if result.Error != nil {
		log.Error("No se encontró la actividad: ", result.Error)
		return result.Error
	}

	if err := Db.Delete(&actividad).Error; err != nil {
		log.Error("Error eliminando la actividad: ", err)
		return err
	}

	log.Info("Actividad eliminada con éxito: ", actividad)
	return nil
}

func CrearActividad(actividad Models.Actividad) error {
	result := Db.Create(&actividad)

	if result.Error != nil {
		log.Error("Error creando la actividad: ", result.Error)
		return result.Error
	}

	log.Info("Actividad creada con éxito: ", actividad)
	return nil
}

func ModificarActividad(id int, actividad Models.Actividad) error {
	if err := Db.Model(&Models.Actividad{}).Where("id = ?", id).Updates(actividad).Error; err != nil {
		return err
	}
	return nil
}
