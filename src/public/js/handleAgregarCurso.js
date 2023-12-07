function mostrarVistaPrevia(input) {
  // Referencia a elemento del DOM
  const imagenPreview = document.getElementById("imagen-preview");

  // Selecciono el archivo que viene del INPUT
  const file = input.files[0];

  if (file) {
    // Si hay archivo, creo un nuevo objeto FileReader para leer el contenido del archivo.
    const reader = new FileReader();

    // Defino función que se ejecuta cuando la lectura del archivo esté completa.
    reader.onload = function (e) {
      // Establece la fuente de la imagen de vista previa con los datos codificados del archivo.
      imagenPreview.src = e.target.result;

      // Hace que el elemento de vista previa de la imagen sea visible.
      imagenPreview.style.display = "block";
    };

    // Inicia la lectura del contenido del archivo como una URL de datos codificados
    reader.readAsDataURL(file);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Selectores elementos DOM
  const formulario = document.querySelector(".formulario");
  const inputNombre = document.querySelector("#nombre");
  const inputDescripcion = document.querySelector("#descripcion");
  const inputImagen = document.querySelector("#imagen");
  const spinner = document.getElementById("spinner");

  //   Procedimiento de SUBMIT
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
    formData.append("img", imagen);

    // URL de la API, cambiar en funcion de si estamos en produccion o en desarrollo
    const baseUrl = "https://codocursosbackend.onrender.com";;

    try {
      // Mientras dure el proceso de submit, se muestra un spinner en pantalla
      spinner.style.display = "block";

      //   Mando la data mediante POST al endpoint de la API
      const response = await fetch(`${baseUrl}/cursos`, {
        method: "POST",
        body: formData,
      });

      //   Si la respuesta esta OK, convierto la promesa a JSON, y redirijo a listado de cursos
      if (response.ok) {
        
        window.location.href = "./listadoCursos.html";
      } else {
        // En caso de error, dejo de mostrar el spinner, mando mensaje de error por consola
        spinner.style.display = "none";

        console.error(
          "Error en la solicitud:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      spinner.style.display = "none";
      console.error("Error al realizar la solicitud:", error);
    }
  });
});
