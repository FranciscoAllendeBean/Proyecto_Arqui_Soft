package dto

type Usuariodto struct {
	Id       int    `json:"id"`
	Name     string `json:"nombre"`
	Surname  string `json:"apellido"`
	Dni      int    `json:"dni"`
	User     string `json:"usuario"`
	Password string `json:"password"`
	Usertype string `json:"tipo_de_usuario"`
}

type Usuariosdto []Usuariodto
