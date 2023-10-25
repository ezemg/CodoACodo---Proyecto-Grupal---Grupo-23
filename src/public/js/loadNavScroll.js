document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[data-scroll]");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = link.getAttribute("data-scroll");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offset = 80; // Ajusta este valor según tu necesidad
        const targetOffset = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetOffset,
          behavior: "smooth", // Para hacer un desplazamiento suave
        });
      }
    });
  });
});
