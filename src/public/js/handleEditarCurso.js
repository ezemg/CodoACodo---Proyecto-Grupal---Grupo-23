function mostrarVistaPrevia(input) {
  const imagenPreview = document.getElementById("imagen-preview");
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagenPreview.src = e.target.result;
      imagenPreview.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Selectores elementos DOM
  const formulario = document.querySelector(".formulario");
  const inputNombre = document.querySelector("#nombre");
  const inputDescripcion = document.querySelector("#descripcion");
  const inputImagen = document.querySelector("#imagen");
  const errorMsg = document.getElementById("error-msg");
  const spinner = document.getElementById("spinner");

  // URL de la API, cambiar en funcion de si estamos en produccion o en desarrollo
  const baseUrl = "https://codocursosbackend.onrender.com";

  // Obtengo el ID del curso desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  

  //   Extraigo el numero de id desde urlParams
  const idCurso = urlParams.get("id");

  
  // Lógica para obtener y mostrar los datos del curso a editar
  try {
    // Mientras carga la informacion del curso a editar, muestro spinner en pantalla
    spinner.style.display = "block";

    // Le pido a la API la data del curso que quiero editar al endpoint mediante el id del curso
    const res = await fetch(`${baseUrl}/cursos/${idCurso}`);
    // Convierto la promesa a JSON
    const data = await res.json();

    console.log(res)
    // Si la respuesta esta ok:
    if (res.ok) {
      const { curso } = data; // desestructuro el objeto para quedarme solamente con la info del curso a editar

      // Relleno los campos del formulario con los datos del curso que quiero editar
      inputNombre.value = curso.nombre;
      inputDescripcion.value = curso.descripcion;

      //   Dejo de mostrar el spinner
      spinner.style.display = "none";
    } else {
      // En caso de error, muestro mensaje en pantalla
      spinner.style.display = "none";
      formulario.style.display = 'none'
      console.log(res)
      errorMsg.textContent = `Error en la solicitud: ${res.status} ${res.statusText}`;
    }
  } catch (error) {
    errorMsg.textContent = `Error al realizar la solicitud: ${error.message}`;
  }

  //   Logica para el submit del curso editado
  formulario.addEventListener("submit", async (e) => {
    // Evito que el formulario haga submit inmediatamente despues del click
    e.preventDefault();

    // Leo la data que viene del formulario
    const nombre = inputNombre.value;
    const descripcion = inputDescripcion.value.replace(/\n/g, '\\n');
    const imagen = inputImagen.files[0]; // Acceder al archivo de la imagen

    // Creo objeto FormData y agrego datos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);

    // En caso de que la edicion del curso venga con imagen, agrego la imagen a FormData
    if (imagen) {
      formData.append("img", imagen);
    }

    try {
      // Mientras dure el proceso de submit, se muestra un spinner en pantalla
      spinner.style.display = "block";

      //   Mando la data mediante PUT al endpoint de la API
      const response = await fetch(`${baseUrl}/cursos/${idCurso}`, {
        method: "PUT",
        body: formData,
      });

      //   Si la respuesta esta OK, muestro mensaje en consola, y redirijo a listado de cursos
      if (response.ok) {
        console.log("Curso editado con éxito");
        window.location.href = "./listadoCursos.html";
      } else {
        // En caso de error, dejo de mostrar el spinner, mando mensaje de error por consola
        spinner.style.display = "none";

        console.error(
          "Error al intentar editar el curso:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      spinner.style.display = "none"
      console.error("Error al realizar la solicitud de edición:", error);
    }
  });
});
