package Models

type Inscripcion struct {
	Id    int    `gorm:"primaryKey"`
	Fecha string `gorm:"varchar(100);not null"`

	Actividad   Actividad `gorm:"foreignKey:actividadid"`
	Actividadid int

	Usuario   Usuario `gorm:"foreignKey:usuarioid"`
	Usuarioid int
}
