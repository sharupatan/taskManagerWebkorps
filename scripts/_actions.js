const form = document.getElementById("taskForm");
const fileButton = document.getElementById("fileButton");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = document.getElementById("taskText").value;
  const status = document.getElementById("status").value;
  const taskDate = document.getElementById("taskDate").value;
  const description = document.getElementById("description").value;
  const timeConsumed = document.getElementById("timeConsumed").value;

  const currentObject = {
    date: taskDate,
    task: taskText,
    status: status,
    time: timeConsumed,
    description: description,
  };
  data.push(currentObject);
  renderTable();
});
