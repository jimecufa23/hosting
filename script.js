// Acá puse los elementos que voy a llamar
const inputField = document.querySelector(".input-field textarea"),
  todolists = document.querySelector (".todolists"),
  pendingNum = document.querySelector (".pending-num"),
  clearButton = document.querySelector (".clear-button"),
  acceptButton = document.querySelector (".accept-button");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      const liTag = `<li class="list pending" onclick="handleStatus(this)"><span class="task">${task}</span></li>`;
      todolists.insertAdjacentHTML("beforeend", liTag);
    });
    allTasks();
  }
  
  // Función para guardar tareas en localStorage
  function saveTasks() {
    const tasks = Array.from(document.querySelectorAll(".list.pending .task")).map(task => task.textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  
  // al presionar Enter en el textarea
  inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();
    if (e.key === "Enter" && inputVal.length > 0) {
      let liTag = `<li class="list pending" onclick="handleStatus(this)"><span class="task">${inputVal}</span></li>`;
      todolists.insertAdjacentHTML("beforeend", liTag);
      inputField.value = "";
      saveTasks();
      allTasks();
    }
  });
  
  // para cambiar el estado de la tarea completada o pendiente
  function handleStatus(e) {
    e.classList.toggle("pending");
    saveTasks();
    allTasks();
  }
  
  // boton limpiar
  clearButton.addEventListener("click", () => {
    todolists.innerHTML = "";
    localStorage.removeItem("tasks");
    allTasks();
  });
  
  // botón de aceptar
  acceptButton.addEventListener("click", () => {
    let inputVal = inputField.value.trim();
    if (inputVal.length > 0) {
      let liTag = `<li class="list pending" onclick="handleStatus(this)"><span class="task">${inputVal}</span></li>`;
      todolists.insertAdjacentHTML("beforeend", liTag);
      inputField.value = "";
      saveTasks();
      allTasks();
    }
  });
  
  // Cargar tareas al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
  });