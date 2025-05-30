package dto

type Actividaddto struct {
	Id             int    `json:"id"`
	Nombre         string `json:"nombre"`
	Dia            string `json:"dia"`
	Hora           string `json:"hora"`
	Cupo           int    `json:"cupo"`
	Categoria      string `json:"categoria"`
	Descripcion    string `json:"descripcion"`
	Disponibilidad bool   `json:"disponibilidad"`
}

type Actividadesdto []Actividaddto
