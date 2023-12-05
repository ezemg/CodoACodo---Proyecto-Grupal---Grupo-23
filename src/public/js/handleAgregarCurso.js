document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector('.formulario')
    const inputNombre = document.querySelector('#nombre') 
    const inputDescripcion = document.querySelector('#descripcion')
    const inputImagen = document.querySelector('#imagen')
    const spinner = document.getElementById('spinner');


    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = inputNombre.value;
        const descripcion = inputDescripcion.value;
        const imagen = inputImagen.files[0]; // Acceder al archivo de la imagen

        // Crear objeto FormData y agregar datos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('img', imagen);

        const baseUrl = 'https://codocursosbackend.onrender.com';

        try {
            spinner.style.display = 'block';

            const response = await fetch(`${baseUrl}/cursos`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.location.href = './listadoCursos.html';

            } else {
                spinner.style.display = 'none';

                console.error('Error en la solicitud:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
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

