document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el mes actual
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  const calendarTitle = document.getElementById("calendarTitle");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const calendarBody = document.getElementById("calendarBody");
  const courseInfo = document.getElementById("courseInfo");

  // Indico que no muestre el courseInfo al momento de cargar la página
  courseInfo.style.display = "none";

  // Objeto que almacena la información de los cursos
  const courses = {
    python: {
      name: "Curso Python",
      schedule: "Jornada: mañana",
      teacher: "Profe: Ezequiel Garay",
      color: "gray",
      frequency: 35, // Cada 5 semanas (7 días * 5 semanas)
      startDate: new Date(2023, 0, 1), // Fecha de inicio: 1 de enero de 2023
    },
    data: {
      name: "Big Data",
      schedule: "Jornada: Tarde",
      teacher: "Profe: Alan Marasca",
      color: "blue",
      frequency: 60, // Cada 2 meses (30 días * 2 meses)
      startDate: new Date(2023, 0, 10), // Fecha de inicio: 10 de enero de 2023
    },
    FullStack: {
      name: "Programación Full Stack",
      schedule: "Jornada: Noche",
      teacher: "Profe: Ana Gamero",
      color: "red",
      frequency: 56, // Cada 8 semanas (7 días * 8 semanas)
      startDate: new Date(2023, 0, 20), // Fecha de inicio: 20 de enero de 2023
    },
    DataSc: {
      name: "Data Science",
      schedule: "Jornada: Noche",
      teacher: "Profe: Juan Biord",
      color: "yellow",
      frequency: 90, // Cada 3 meses (7 días * 3 meses)
      startDate: new Date(2023, 0, 25), // Fecha de inicio: 20 de enero de 2023
    },
  };

  // Función para actualizar el calendario
  function updateCalendar() {
    calendarTitle.textContent =
      "Próximos cursos - " + (currentMonth + 1) + " / " + currentYear;
    calendarBody.innerHTML = "";

    // Calcular el primer día del mes y el último día del mes
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    let currentRow = document.createElement("tr");

    // Rellenar el calendario con los días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(currentYear, currentMonth, i);

      if (i === 1) {
        // Completar los espacios para los días previos al primer día del mes
        const firstDayOfWeek = firstDay.getDay(); // 0 (Dom) a 6 (Sáb)
        for (let j = 0; j < firstDayOfWeek; j++) {
          const emptyCell = document.createElement("td");
          currentRow.appendChild(emptyCell);
        }
      }

      const dayCell = document.createElement("td");
      dayCell.textContent = i;

      // Marcar las fechas de inicio de cursos con las clases adecuadas
      for (const courseKey in courses) {
        const course = courses[courseKey];
        if (isCourseStartDate(day, course)) {
          dayCell.classList.add(course.color);
          dayCell.classList.add("course-start-date");
          dayCell.addEventListener("click", function () {
            const selectedDate = new Date(currentYear, currentMonth, i);
            showCourseInfo(selectedDate, course);
          });
        }
      }

      currentRow.appendChild(dayCell);

      if (day.getDay() === 6) {
        // Fin de la semana, agregar la fila al cuerpo de la tabla
        calendarBody.appendChild(currentRow);
        currentRow = document.createElement("tr");
      }
    }

    // Completar los espacios para los días siguientes al último día del mes
    const lastDayOfWeek = lastDay.getDay(); // 0 (Dom) a 6 (Sáb)
    for (let k = lastDayOfWeek; k < 6; k++) {
      const emptyCell = document.createElement("td");
      currentRow.appendChild(emptyCell);
    }

    // Agregar la última fila al cuerpo de la tabla
    calendarBody.appendChild(currentRow);
  }

  // Función para mostrar la información del curso seleccionado
  function showCourseInfo(selectedDate, selectedCourse) {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    courseInfo.style.display = "flex";
    document.querySelector(".course-name").textContent =
      selectedCourse.name + "\n";
    document.querySelector(".course-date").textContent =
      selectedDate.toDateString() + "\n";
    document.querySelector(".course-schedule").textContent =
      selectedCourse.schedule + "\n";
    document.querySelector(".course-teacher").textContent =
      selectedCourse.teacher + "\n";
  }

  // Función para determinar si una fecha es la fecha de inicio de un curso
  function isCourseStartDate(date, course) {
    const courseStartDate = course.startDate;
    const today = new Date(currentYear, currentMonth, date.getDate());

    if (courseStartDate <= today) {
      const timeDiff = today - courseStartDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff % course.frequency === 0;
    }

    return false;
  }

  // Event listener para el botón de mes anterior
  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
    courseInfo.style.display = "none"; // Ocultar la información del curso al cambiar de mes
  });

  // Event listener para el botón de mes siguiente
  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
    courseInfo.style.display = "none"; // Ocultar la información del curso al cambiar de mes
  });

  // Inicializar el calendario
  updateCalendar();
});
