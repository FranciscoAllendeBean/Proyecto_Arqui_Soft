async function crearInscripcion(actividad_id, usuario_id) {
  try {
    const response = await fetch('http://localhost:8080/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actividadid: actividad_id,
        usuarioid: usuario_id,
        fecha: new Date().toISOString().slice(0, 10) // formato YYYY-MM-DD
      })
    });
    if (response.ok) {
      alert('Inscripción realizada con éxito');
      return true;
    } else {
      const data = await response.json();
      alert(data.message || 'Error al inscribirse');
      return false;
    }
  } catch (err) {
    alert('Error al conectar con el servidor');
    return false;
  }
}
//  Boton para realizar la inscripcion
//<button onClick={() => crearInscripcion(actividad.id, usuario.id)}>
//  Inscribirse
//</button>