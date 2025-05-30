package dto

type Inscripciondto struct {
	Id    int    `json:"id"`
	Fecha string `json:"fecha"`

	Actividadid int `json:"actividad_id"`

	Usuarioid int `json:"usuario_id"`
}
