async function crearInscripcion(actividad_id, usuario_id) {
  try {
    const respCheck = await fetch(`http://localhost:8080/usuarios/${usuario_id}/actividades`);
    if (!respCheck.ok) {
      alert('No se pudo comprobar inscripciones (error de red)');
      return false;
    }
    const data = await respCheck.json(); // puede venir como array o { inscripciones: [...] }
    const inscripciones = Array.isArray(data) ? data : (data.inscripciones || data.actividades || []);

    // crear un set de "usuario:actividad"
    const existingPairs = new Set(
      inscripciones.map(it => {
        const u = Number(it.Usuarioid ?? it.usuarioid ?? usuario_id); // fallback
        const a = Number(it.Actividadid ?? it.actividadid ?? it.Id ?? it.id);
        return `${u}:${a}`;
      })
    );

    const targetPair = `${Number(usuario_id)}:${Number(actividad_id)}`;
    if (existingPairs.has(targetPair)) {
      alert('Ya estás inscripto en esa actividad');
      return false;
    }
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