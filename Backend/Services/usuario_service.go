package Services

import (
	usuarioCliente "Backend/clients"
	//"Backend/dto"
	"Backend/Models"
	e "Backend/errors"
)

type usuarioService struct{}

type usuarioServiceInterface interface {
	CrearUsuario(usuario Models.Usuario) e.ApiError
	Login(user string, password string) (bool, e.ApiError)
	GetByUser(user string) (*Models.Usuario, error)
}

var (
	UsuarioService usuarioServiceInterface
)

func init() {
	UsuarioService = &usuarioService{}
}

func (s *usuarioService) CrearUsuario(usuario Models.Usuario) e.ApiError {
	err := usuarioCliente.CrearUsuario(usuario)
	if err != nil {
		return e.NewInternalServerApiError("No se pudo crear el usuario", err)
	}
	return nil
}

func (s *usuarioService) Login(user string, password string) (bool, e.ApiError) {
	ok, err := usuarioCliente.Login(user, password)
	if err != nil {
		return false, e.NewInternalServerApiError("Error en el login", err)
	}
	return ok, nil
}

func (s *usuarioService) GetByUser(user string) (*Models.Usuario, error) {
	return usuarioCliente.GetByUser(user)
}
