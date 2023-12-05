document.addEventListener("DOMContentLoaded", async function () {
    const cursosContainer = document.getElementById('cursos-container');
    const errorMsg = document.getElementById('error-msg');
    const spinner = document.getElementById('spinner');

    const baseUrl = 'https://codocursosbackend.onrender.com';

    spinner.style.display = 'block';

    try {
        const res = await fetch(`${baseUrl}/cursos`);
        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = `Error en la solicitud: ${res.status} ${res.statusText}`;
            return;
        }

        const { cursos } = data;

        if (cursos.length === 0) {
            errorMsg.textContent = 'No hay cursos disponibles.';
            return;
        }

        cursos.forEach(curso => {
            const cursoDiv = crearCursoDiv(curso);
            cursosContainer.appendChild(cursoDiv);
        });
    } catch (error) {
        errorMsg.textContent = `Error al realizar la solicitud: ${error.message}`;
    } finally {
        spinner.style.display = 'none';
    }
});

function crearCursoDiv(curso) {
    const cursoDiv = document.createElement('div');
    cursoDiv.classList.add('curso');

    const img = crearImagen(curso.img);
    cursoDiv.appendChild(img);

    const nombre = crearElemento('h3', curso.nombre);
    cursoDiv.appendChild(nombre);

    const descripcion = crearElemento('p', curso.descripcion);
    cursoDiv.appendChild(descripcion);

    const editarBtn = crearBotonEditar(curso.codigo);
    cursoDiv.appendChild(editarBtn);

    const eliminarBtn = crearBotonEliminar(curso, cursoDiv);
    eliminarBtn.addEventListener('click', () => {
        handleEliminarCurso(curso, cursoDiv);
    });
    cursoDiv.appendChild(eliminarBtn);

    return cursoDiv;
}

function crearBotonEditar(idCurso) {
    const editarBtn = document.createElement('button');
    editarBtn.classList.add('editar-btn');
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', () => {
        // Cambia la redirección a incluir el ID como parte de la ruta
        window.location.href = `./editarCurso.html?id=${idCurso}`;
    });
    return editarBtn;
}

async function handleEliminarCurso(curso, cursoDiv) {
    try {
        const baseUrl = 'https://codocursosbackend.onrender.com';

        const result = await Swal.fire({
            title: "¿Estás seguro de querer eliminar este curso?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: 'Cancelar'
        });

        
        if (result.isDismissed) {
            Swal.fire("Eliminación cancelada", "", "info");
            return;
        }
            
        const response = await fetch(`${baseUrl}/cursos/${curso.codigo}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            cursoDiv.remove();
            Swal.fire("Curso eliminado con éxito", "", "success");
        } else {
            console.error('Error al intentar eliminar el curso:', response.status, response.statusText);
            Swal.fire("Error al eliminar el curso", "", "error");
        }
    } catch (error) {
        console.error('Error al manejar la eliminación del curso:', error);
        Swal.fire("Error al manejar la eliminación del curso", "", "error");
    }
}


function crearImagen(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
}

function crearElemento(tag, contenido) {
    const elemento = document.createElement(tag);
    elemento.textContent = contenido;
    return elemento;
}

function crearBotonEliminar(curso, cursoDiv) {
    const eliminarBtn = document.createElement('button');
    eliminarBtn.classList.add('eliminar-btn');
    eliminarBtn.textContent = 'Eliminar';
    return eliminarBtn;
}
