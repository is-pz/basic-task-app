$(function () {
  console.log("jQuery loaded");

  let edit = false;

  $("#task-result").hide();
  fetchTasks();

  $("#search").keyup(() => {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { search },
        success: (response) => {
          let tasks = JSON.parse(response);
          let template = "";
          tasks.forEach((task) => {
            template += `<li>
                ${task.name}
              </li>`;
          });
          $("#container").html(template);
          $("#task-result").show();
        },
      });
    }
  });

  $("#task-form").submit((e) => {
    e.preventDefault();
    const postData = {
      id: $("#task-id").val(),
      name: $("#name").val(),
      description: $("#description").val(),
    };

    let url = edit === false ? "task-add.php" : "task-edit.php";

    $.post(url, postData, (response) => {
      fetchTasks();

      $("#task-form").trigger("reset");
    });
  });

  function fetchTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: (response) => {
        let tasks = JSON.parse(response);
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
        $("#tasks").html(template);
      },
    });
  }

  $(document).on("click", ".task-delete", function (e) {
    if (confirm("Are you sure you want to delete it?")) {
      let element = $(this)["0"].parentElement.parentElement;
      let id = $(element).attr("taskId");
      $.post("task-delete.php", { id }, (response) => {
        console.log(response);
        fetchTasks();
      });
    }
  });

  $(document).on("click", ".task-item", function (e) {
    e.preventDefault();
    let element = $(this)["0"].parentElement.parentElement;
    let id = $(element).attr("taskId");
    $.post("task-single.php", { id }, (response) => {
      const task = JSON.parse(response);
      $("#task-id").val(task.id);
      $("#name").val(task.name);
      $("#description").val(task.description);
      edit = true;
    });
  });
});
