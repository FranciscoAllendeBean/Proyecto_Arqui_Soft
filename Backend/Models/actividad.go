package Models

type Actividad struct {
	Id             int    `gorm:"primaryKey"`
	Nombre         string `gorm:"type:varchar(100); not null"`
	Dia            string `gorm:"type:varchar(100); not null"`
	Hora           string `gorm:"type:varchar(100); not null"`
	Cupo           int    `gorm:"not null"`
	Categoria      string `gorm:"type:varchar(100); not null"`
	Descripcion    string `gorm:"type:varchar(350)"`
	Disponibilidad bool   `gorm:"default:true"`
}

type Actividades []Actividad
