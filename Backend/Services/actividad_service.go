package Services

import (
	actividadCliente "Backend/Clients"
	"Backend/dto"

	"Backend/Models"

	e "Backend/errors"
)

type actividadService struct{}

type actividadServiceInterface interface {
	GetActividadById(id int) (dto.ActividadDto, e.ApiError)
	InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError)
	ModificarActividad(id int, campo string, valor interface{}) e.ApiError
	DeleteActividad(id int) e.ApiError
	GetActividadDisponible() ([]dto.ActividadDto, e.ApiError)
}

var (
	ActividadService actividadServiceInterface
)

func init() {
	ActividadService = &actividadService{}
}

func (s *actividadService) GetActividadById(id int) (dto.ActividadDto, e.ApiError) {

	var actividad Models.Actividad = actividadCliente.GetActividadById(id)
	var actividadDto dto.ActividadDto

	if actividad.Id == 0 {
		return actividadDto, e.NewBadRequestApiError("actividad not found")
	}

	actividadDto.Nombre = actividad.Nombre
	actividadDto.Id = actividad.Id
	actividadDto.Dia = actividad.Dia
	actividadDto.Hora = actividad.Hora
	actividadDto.Cupo = actividad.Cupo
	actividadDto.Categoria = actividad.Categoria
	actividadDto.Descripcion = actividad.Descripcion
	actividadDto.Disponibilidad = actividad.Disponibilidad

	return actividadDto, nil
}

func (s *actividadService) InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError) {

	var actividad Models.Actividad
	actividad.Nombre = actividadDto.Nombre
	actividad.Descripcion = actividadDto.Descripcion
	actividad.Cupo = actividadDto.Cupo
	actividad.Dia = actividadDto.Dia
	actividad.Hora = actividadDto.Hora
	actividad.Categoria = actividadDto.Categoria
	actividad.Descripcion = actividadDto.Descripcion
	actividad.Disponibilidad = actividadDto.Disponibilidad

	actividad = actividadCliente.CrearActividad(actividad)

	actividadDto.Id = actividad.Id

	return actividadDto, nil
}

func (s *actividadService) ModificarActividad(id int, campo string, valor interface{}) e.ApiError {
	err := actividadCliente.ModificarActividad(id, campo, valor)
	if err != nil {
		return e.NewInternalServerApiError("No se pudo modificar la actividad", err)
	}
	return nil
}

func (s *actividadService) DeleteActividad(id int) e.ApiError {
	err := actividadCliente.DeleteActividad(id)
	if err != nil {
		return e.NewInternalServerApiError("No se pudo borrar la actividad", err)
	}
	return nil
}

func (s *actividadService) GetActividadDisponible() ([]dto.ActividadDto, e.ApiError) {
	actividades := actividadCliente.GetActividadDisponible()
	var actividadesDto []dto.ActividadDto

	for _, actividad := range actividades {
		var actividadDto dto.ActividadDto
		actividadDto.Nombre = actividad.Nombre
		actividadDto.Id = actividad.Id
		actividadDto.Dia = actividad.Dia
		actividadDto.Hora = actividad.Hora
		actividadDto.Cupo = actividad.Cupo
		actividadDto.Categoria = actividad.Categoria
		actividadDto.Descripcion = actividad.Descripcion
		actividadDto.Disponibilidad = actividad.Disponibilidad
		actividadesDto = append(actividadesDto, actividadDto)
	}

	return actividadesDto, nil
}
