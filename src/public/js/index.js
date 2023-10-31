// Espero a que se cargue el DOM antes de ejecutar la función
document.addEventListener("DOMContentLoaded", function () {
  // Función para cargar testimonios
  const loadTestimonials = async () => {
    try {
      // Le pido a la API los usuarios
      const users = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then(res => res.json());

      // Le pido a la API comentarios
      const comments = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=10" //
      ).then(res => res.json());

      // Genero un array de objetos donde asocio comentarios random a usuarios random.
      const data = users
        .map((user, i) => ({
          ...user,
          comment: comments[i].body,
        }))
        .slice(0, 6);

      // Selecciono el contenedor en donde se inicializa el slider
      const sliderContainer = document.querySelector(".my-slider");

      //  Genero el contenido HTML de cada slide y lo inserto dentro del contenedor donde se inicializa el slider
      console.log(data);
      data.forEach((item, i) => {
        const testimonioHTML = `
        <div class="item testimonial-card">
        <main class="test-card-body">
          <div class="quote">
            <i class="fa fa-quote-left"></i>
            <h2>${item.company.catchPhrase}</h2>
          </div>
          <p>
        ${item.comment.slice(0, 80)}
          </p>
          <div class="ratings">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </main>
        <div class="profile">
          <div class="profile-image">
            <img src="./public/assets/testimonial/image${i + 1}.jpg" />
          </div>
          <div class="profile-desc">
            <span>${item.name}</span>
            <span>${item.company.name}</span>
          </div>
        </div>
      </div>
        `;
        sliderContainer.insertAdjacentHTML("beforeend", testimonioHTML);
      });

      // Inicializo el carrusel de Tiny Slider después de agregar los elementos
      const slider = tns({
        container: ".my-slider",
        items: 1,
        autoplay: false,
        controls: false,
        navPosition: "bottom",
        mouseDrag: true,
        nav: false,
        responsive: {
          468: {
            items: 3,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Llamado a la función para cargar los testimonios
  loadTestimonials();
});
// calendario
