package Services

import (
	inscripcionCliente "Backend/clients"

	//"Backend/dto"

	"Backend/Models"

	e "Backend/errors"
)

type inscripcionService struct{}

type inscripcionServiceInterface interface {
	CrearInscripcion(inscripcion Models.Inscripcion) e.ApiError
	GetActividadesPorUsuario(usuarioid int) ([]Models.Actividad, e.ApiError)
	DesinscribirseInscripcion(usuarioId int, actividadId int) e.ApiError
}

var (
	InscripcionService inscripcionServiceInterface
)

func init() {
	InscripcionService = &inscripcionService{}
}

func (s *inscripcionService) CrearInscripcion(inscripcion Models.Inscripcion) e.ApiError {
	err := inscripcionCliente.CrearInscripcion(inscripcion)
	if err != nil {
		return e.NewInternalServerApiError("No se pudo crear la inscripción", err)
	}
	return nil
}

func (s *inscripcionService) GetActividadesPorUsuario(usuarioid int) ([]Models.Actividad, e.ApiError) {
	actividades, err := inscripcionCliente.GetActividadesPorUsuario(usuarioid)
	if err != nil {
		return nil, e.NewInternalServerApiError("No se pudieron obtener las actividades del usuario", err)
	}
	return actividades, nil
}

func (s *inscripcionService) DesinscribirseInscripcion(usuarioId int, actividadId int) e.ApiError {
	err := inscripcionCliente.DesinscribirseInscripcion(usuarioId, actividadId)
	if err != nil {
		return e.NewInternalServerApiError("No se pudo desinscribir", err)
	}
	return nil
}
