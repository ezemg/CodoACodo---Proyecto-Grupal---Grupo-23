document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent event to get into default //

    //Llama a los valores del formulario//
    const name = document.getElementById("nombre").value;
    const name = document.getElementById("mail").value;
    const name = document.getElementById("telefono").value;
    const name = document.getElementById("mensaje").value;

    //Lógica de la validación//
    if (name === "" || mail === "" || telefono === "" || mensaje === "") {
      alert("Todos los campos son requeridos");
    } else if (!isvalidemail(email)) {
      alert("El mail es incorrecto :(");
    } else {
      alert("Gracias por tu consulta, en breve nos contactaremos");
    }
  });

// Funcion de validación//
function isvalidemail(email) {
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailregex.test(email);
  alert("El mail es incorrecto :(");
}
