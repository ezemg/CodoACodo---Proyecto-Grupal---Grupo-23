
document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent event to get into default //
  
    //Llama a los valores del formulario//
    const name = document.getElementById("nombre").value;
    const mail = document.getElementById("mail").value;
    const telefono = document.getElementById("telefono").value;
    const message = document.getElementById("message").value;


    //Lógica de la validación//
    if (name === "" || mail === "" || telefono === "" || message === "") {
      alert("Todos los campos son requeridos");
    } 
      else if (!isValidemail(mail)) {
      alert("El mail es incorrecto :(");
      }
      else if (!isValidPhone(telefono)) {
        alert ("El teléfono debe contener al menos 10 números :/");
      }
     else {
      alert("Gracias por tu consulta, en breve nos contactaremos")};
    

// Funcion de validación//
function isValidemail(mail) {
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailregex.test(mail);
  alert("El mail es incorrecto :(");
}
function isValidPhone(telefono) {
  const phoneRegex = /^\d{10,14}$/;
  return phoneRegex.test(telefono)
  alert ("El teléfono debe contener al menos 10 números :/");
}
});

