const formulario = document.getElementById("formulario");
const inputElements = document.querySelectorAll(".formulario__input");
const iconElements = document.querySelectorAll(
  ".formulario__validacion-estado"
);

function isValidName(name) {
  // Agrega aquí tu lógica de validación para el campo "nombre"
  return name.trim() !== "";
}
const isValidEmail = mail => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(mail);
};

const isValidPhone = telefono => {
  const phoneRegex = /^\d{10,14}$/;
  return phoneRegex.test(telefono);
};

function validateInput(input) {
  const fieldType = input.getAttribute("name"); // Obtén el atributo "name" del campo

  if (fieldType === "nombre") {
    return isValidName(input.value);
  } else if (fieldType === "mail") {
    return isValidEmail(input.value);
  } else if (fieldType === "telefono") {
    return isValidPhone(input.value);
  }

  return true;
}

const inputIconPairs = [];

inputElements.forEach((input, index) => {
  const icon1 = iconElements[index * 2]; // Primer ícono
  const icon2 = iconElements[index * 2 + 1]; // Segundo ícono
  inputIconPairs.push({ input, icons: [icon1, icon2] });
});

// Agrega un evento blur a cada campo de entrada para validar y mostrar/ocultar íconos
inputElements.forEach(input => {
  input.addEventListener("focus", () => {
    // Cuando se enfoca en el campo de entrada, ocultar el mensaje de error
    const fieldType = input.getAttribute("name");
    const errorMessage = document.getElementById(`mensaje__${fieldType}`);

    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  });

  input.addEventListener("blur", () => {
    const inputIconPair = inputIconPairs.find(pair => pair.input === input);

    if (inputIconPair) {
      const isValid = validateInput(input);

      inputIconPair.icons.forEach(icon => {
        icon.style.display = isValid ? "none" : "block";
      });

      if (!isValid) {
        input.classList.add("formulario__input-error");
      } else {
        input.classList.remove("formulario__input-error");
      }
    }
  });
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent event to get into default //

  //Llama a los valores del formulario//
  const name = document.getElementById("nombre").value;
  const mail = document.getElementById("mail").value;
  const telefono = document.getElementById("telefono").value;
  const message = document.getElementById("message").value;

  const nameMessage = document.getElementById("mensaje__nombre");
  const mailMessage = document.getElementById("mensaje__mail");
  const telefonoMessage = document.getElementById("mensaje__telefono");
  const successMessage = document.getElementById("formulario__mensaje-exito");

  if (
    name.length < 1 &&
    mail.length < 1 &&
    telefono.length < 1 &&
    message.length < 1
  ) {
    nameMessage.style.display = "block";
    mailMessage.style.display = "block";
    telefonoMessage.style.display = "block";

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Todos los campos son requeridos",
    });
  } else if (!isValidName(name)) {
    nameMessage.style.display = "block";

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El mail es incorrecto :(",
    });
  } else if (!isValidEmail(mail)) {
    mailMessage.style.display = "block";

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El mail es incorrecto :(",
    });
  } else if (!isValidPhone(telefono)) {
    telefonoMessage.style.display = "block";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El teléfono debe contener al menos 10 números :/",
    });
  } else if (message.length < 1) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No olvides escribir tu mensaje!",
    });
  } else {
    successMessage.style.display = "block";
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Gracias por tu consulta, en breve nos contactaremos",
    });
  }
});

// Asocia cada par de íconos con su campo de entrada correspondiente
