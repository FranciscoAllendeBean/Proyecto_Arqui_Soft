package Models

type actividad struct {
	id             int    `gorm:"primaryKey"`
	nombre         string `gorm:"type:varchar(100); not null"`
	dia            string `gorm:"type:varchar(100); not null"`
	hora           string `gorm:"type:varchar(100); not null"`
	cupo           int    `gorm:"not null"`
	categoria      string `gorm:"type:varchar(100); not null"`
	descripcion    string `gorm:"type:varchar(350)"`
	disponibilidad bool   `gorm:"default:true"`
}

type actividades []actividad
