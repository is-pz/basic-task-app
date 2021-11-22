// Oculta de inico la seccion de resultados
var taskResult = document.getElementById("task-result");

taskResult.hidden = true;
// ------------------------------------------------------

let edit = false;
fetchTask();

//Funcion fetch
async function sendRequest(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
// ------------------------------------------------------

//Evento para la busqueda de tareas
var searchBar = document.getElementById("search");

searchBar.addEventListener("keyup", async function (e) {
  if (e.target.value) {
    let search = e.target.value;
    var data = new FormData();
    data.append("search", search);
    const options = {
      method: "POST",
      body: data,
    };
    var task = await sendRequest("./task-search.php", options);
    let template = "";
    task.forEach((task) => {
      template += `<li>
            ${task.name}
            </li>`;
    });
    taskResult.querySelector(".container").innerHTML = template;
    taskResult.hidden = false;
  } else if (e.target.value == "" || e.target.value == null) {
    taskResult.hidden = true;
  }
});
// -------------------------------------------------------

//Funcion para obtener las tareas
async function fetchTask() {
  const options = {
    method: "GET",
  };
  let tasks = await sendRequest("./task-list.php", options);
  let template = "";
  tasks.forEach((task) => {
    template += `
                <tr taskId="${task.id}">
                    <td>${task.id}</td>
                    <td><a href="#" class="task-item" style="color:white">${task.name}</a></td>
                    <td>${task.description}</td>
                    <td><button class="task-delete btn btn-danger btn-sm ">Delete</button></td>
                </tr>
            `;
  });
  document.getElementById("tasks").innerHTML = template;
}
//--------------------------------

//Evento para el envio de formulario

var taskForm = document.getElementById("task-form");
var inputId = document.getElementById("task-id");
taskForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const postData = new FormData();
  postData.append("id", document.getElementById("task-id").value);
  postData.append("name", document.getElementById("name").value);
  postData.append("description", document.getElementById("description").value);
  const options = {
    method: "POST",
    body: postData,
  };

  let url = edit === false ? "./task-add.php" : "./task-edit.php";

  await sendRequest(url, options);
  fetchTask();

  inputId.value = "";
  taskForm.reset();
  edit = false;
});
//--------------------------------

//Evento para el boton de eliminar tareas eliminar tareas
document.onclick = async function (e) {
  console.log(e);
  if (e.target.classList.contains("task-delete")) {
    if (confirm("Are you sure you want to delete this task?")) {
      let element = e.target.parentElement.parentElement;
      let id = element.getAttribute("taskId");
      var data = new FormData();
      data.append("id", id);
      const options = {
        method: "POST",
        body: data,
      };

      await sendRequest("./task-delete.php", options);
      fetchTask();
    }
  }
};
//--------------------------------

//Funcion para la edicion de tareas
document.onclick = async function (e) {
  if (e.target.classList.contains("task-item")) {
    let element = e.target.parentElement.parentElement;
    let id = element.getAttribute("taskId");
    var data = new FormData();
    data.append("id", id);
    const options = {
      method: "POST",
      body: data,
    };

    var task = await sendRequest("./task-single.php", options);
    document.getElementById("task-id").value = task.id;
    document.getElementById("name").value = task.name;
    document.getElementById("description").value = task.description;
    edit = true;
  }
};
