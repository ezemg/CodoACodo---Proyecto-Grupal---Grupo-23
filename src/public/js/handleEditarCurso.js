document.addEventListener("DOMContentLoaded", async function () {
    const formulario = document.querySelector('.formulario');
    const inputNombre = document.querySelector('#nombre');
    const inputDescripcion = document.querySelector('#descripcion');
    const inputImagen = document.querySelector('#imagen');
    const errorMsg = document.getElementById('error-msg');
    const spinner = document.getElementById('spinner');

    const baseUrl = 'http://127.0.0.1:5000';

    // Obtiene el ID del curso desde la URL
    const urlParams = new URLSearchParams(window.location.search);

    const idCurso = urlParams.get('id');

    // Lógica para obtener y mostrar los datos del curso a editar
    try {

        spinner.style.display = 'block';


        const res = await fetch(`${baseUrl}/cursos/${idCurso}`);
        const data = await res.json();

        if (res.ok) {
            const { curso } = data; // Asumo que tu API devuelve el curso directamente, ajusta según tu implementación

            // Rellena los campos del formulario con los datos actuales del curso
            inputNombre.value = curso.nombre;
            inputDescripcion.value = curso.descripcion;

            spinner.style.display = 'none';

            // Puedes agregar más lógica según tus necesidades
        } else {
            errorMsg.textContent = `Error en la solicitud: ${res.status} ${res.statusText}`;
        }
    } catch (error) {
        errorMsg.textContent = `Error al realizar la solicitud: ${error.message}`;
    }

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = inputNombre.value;
        const descripcion = inputDescripcion.value;
        const imagen = inputImagen.files[0]; // Acceder al archivo de la imagen

        // Crear objeto FormData y agregar datos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);

        // Añadir la nueva imagen solo si se proporciona
        if (imagen) {
            formData.append('img', imagen);
        }

        // Lógica para enviar los datos actualizados al backend
        try {
            spinner.style.display = 'block';

            const response = await fetch(`${baseUrl}/cursos/${idCurso}`, {
                method: 'PUT', // Utiliza el método adecuado según tu API (PUT, PATCH, etc.)
                body: formData,
            });

            if (response.ok) {
                // Puedes redirigir al usuario a la página de detalle del curso u otra página
                console.log('Curso editado con éxito');
                window.location.href = './listadoCursos.html';

            } else {
                spinner.style.display = 'none';

                console.error('Error al intentar editar el curso:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud de edición:', error);
        }
    });
});

function mostrarVistaPrevia(input) {
    const imagenPreview = document.getElementById('imagen-preview');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagenPreview.src = e.target.result;
            imagenPreview.style.display = 'block';
        };

        reader.readAsDataURL(file);
    }
}
