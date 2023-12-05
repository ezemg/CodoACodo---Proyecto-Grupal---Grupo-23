const handleEliminarCurso = async (curso, cursoDiv) => {
  const spinner = document.getElementById("spinner");

  // URL de la API, cambiar en funcion de si estamos en produccion o en desarrollo
  const baseUrl = "https://codocursosbackend.onrender.com";

  try {
    // Disparo una alerta para ver si se quiere eliminar el curso
    const result = await Swal.fire({
      title: "¿Estás seguro de querer eliminar este curso?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    // En caso de que presione en cancelar, retorno
    if (result.isDismissed) {
      Swal.fire("Eliminación cancelada", "", "info");
      return;
    }
    spinner.style.display = "block";

    // En caso de que presione aceptar, llamo a eliminar el curso de la base de datos desde la API
    const response = await fetch(`${baseUrl}/cursos/${curso.codigo}`, {
      method: "DELETE",
    });

    // Si se elimina correctamente, elimino el div de la lista y disparo un mensaje de exito
    if (response.ok) {
      await cursoDiv.remove();

      spinner.style.display = "none";

      Swal.fire("Curso eliminado con éxito", "", "success");
    } else {
      // Si hay problemas en la eliminacion, mando mensaje por consola y disparo mensaje de error en el DOM
      console.error(
        "Error al intentar eliminar el curso:",
        response.status,
        response.statusText
      );
      Swal.fire("Error al eliminar el curso", "", "error");
    }
  } catch (error) {
    console.error("Error al manejar la eliminación del curso:", error);
    Swal.fire("Error al manejar la eliminación del curso", "", "error");
  }
};

const crearImagen = (src) => {
  const img = document.createElement("img");
  img.src = src;
  return img;
};

const crearElemento = (tag, contenido) => {
  const elemento = document.createElement(tag);
  elemento.textContent = contenido;
  return elemento;
};

const crearBotonEliminar = (curso, cursoDiv) => {
  const eliminarBtn = document.createElement("button");
  eliminarBtn.classList.add("eliminar-btn");
  eliminarBtn.textContent = "Eliminar";
  return eliminarBtn;
};

const crearBotonEditar = (idCurso) => {
  const editarBtn = document.createElement("button");
  editarBtn.classList.add("editar-btn");
  editarBtn.textContent = "Editar";
  editarBtn.addEventListener("click", () => {
    // Redirecciono e incluyo el ID como parte de la ruta
    window.location.href = `./editarCurso.html?id=${idCurso}`;
  });
  return editarBtn;
};

const crearCursoDiv = (curso) => {
  const cursoDiv = crearElemento("div");
  cursoDiv.classList.add("curso");

  const img = crearImagen(curso.img);
  cursoDiv.appendChild(img);

  const nombre = crearElemento("h3", curso.nombre);
  cursoDiv.appendChild(nombre);

  const descripcion = crearElemento("p", curso.descripcion);
  cursoDiv.appendChild(descripcion);

  const editarBtn = crearBotonEditar(curso.codigo);
  cursoDiv.appendChild(editarBtn);

  const eliminarBtn = crearBotonEliminar(curso, cursoDiv);
  eliminarBtn.addEventListener("click", () => {
    handleEliminarCurso(curso, cursoDiv);
  });
  cursoDiv.appendChild(eliminarBtn);

  return cursoDiv;
};

// Contenido a cargar al renderizar la vista
document.addEventListener("DOMContentLoaded", async function () {
  // Selectores
  const cursosContainer = document.getElementById("cursos-container");
  const errorMsg = document.getElementById("error-msg");
  const spinner = document.getElementById("spinner");

  // URL de la API, cambiar en funcion de si estamos en produccion o en desarrollo
  const baseUrl = "https://codocursosbackend.onrender.com";

  // Indico que se vea el spinner al momento de cargar la vista
  spinner.style.display = "block";

  try {
    const res = await fetch(`${baseUrl}/cursos`); // Pido el listado de cursos a la API
    const data = await res.json(); // Convierto la promesa a JSON

    if (!res.ok) {
      // Si la solicitud a la API tiene error, interrumpo la ejecucion y establezco mensaje de error
      errorMsg.textContent = `Error en la solicitud: ${res.status} ${res.statusText}`;
      return;
    }

    const { cursos } = data; // Desestructuro lo que viene desde la API, para quedarme solamente con los cursos

    if (cursos.length === 0) {
      // Si la respuesta de la API es exitosa pero no tengo cursos, interrumpo ejecucion e informo que no hay cursos
      errorMsg.textContent = "No hay cursos disponibles.";
      return;
    }

    // Si tengo uno o mas cursos, creo un DIV con la informacion correspondiente por cada uno de los cursos
    cursos.forEach((curso) => {
      const cursoDiv = crearCursoDiv(curso);
      cursosContainer.appendChild(cursoDiv);
    });
  } catch (error) {
    errorMsg.textContent = `Error al realizar la solicitud: ${error.message}`;
  } finally {
    // Cuando finalizan todas las tareas, saco el spinner de la pantalla y se visualiza la vista completa
    spinner.style.display = "none";
  }
});
