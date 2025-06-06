package Models

type Inscripcion struct {
	Id    int    `gorm:"primaryKey"`
	Fecha string `gorm:"varchar(100);not null"`

	Actividad   Actividad `gorm:"foreinkey:actividadid"`
	Actividadid int

	Usuario   Usuario `gorm:"foreinkey:usuarioid"`
	Usuarioid int
}
