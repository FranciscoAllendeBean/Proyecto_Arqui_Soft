package dto

type Usuariodto struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Dni      int    `json:"dni"`
	User     string `json:"user"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Usuariosdto []Usuariodto
