package Models

type inscripcion struct {
	id    int    `gorm:"primaryKey"`
	fecha string `gorm:"varchar(100);not null"`

	actividad   actividad `gorm:"foreinkey:actividadid"`
	actividadid int

	usuario   usuario `gorm:"foreinkey:usuarioid"`
	usuarioid int
}
