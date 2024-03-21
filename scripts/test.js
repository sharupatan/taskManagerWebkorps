// user input manipulation
const data = [
  {
    date: "20/01/2024",
    task: "learn html",
    status: "completed",
    time: "10",
    description: "so and so",
  },
];
function generateTable(data) {
  let table = "<table><tr>";

  // Extract column headers dynamically from the keys of the first object
  const columns = Object.keys(data[0]);

  columns.forEach((column) => {
    table += `<th>${column.charAt(0).toUpperCase() + column.slice(1)}</th>`;
  });

  table += "</tr>";

  data.forEach((item) => {
    table += "<tr>";
    columns.forEach((column) => {
      table += `<td>${item[column]}</td>`;
    });
    table += "</tr>";
  });

  table += "</table>";

  return table;
}
tableContainer = document.getElementById("table-container");
function renderTable() {
  tableContainer.innerHTML = generateTable(data);
}
renderTable();

// folder manipulation
if ("showDirectoryPicker" in window) {
  const folderName = "DailyTasksFolder";

  async function getDirectoryHandle() {
    let directoryHandle;

    try {
      directoryHandle = await window.showDirectoryPicker();
    } catch (error) {
      console.error("Error selecting directory:", error);
    }

    return directoryHandle;
  }

  async function createFileInFolder(folderHandle) {
    try {
      const fileHandle = await folderHandle.getFileHandle("tasksdaily.txt", {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write("Task 1\nTask 2\nTask 3");
      await writable.close();

      console.log("File 'tasksdaily.txt' created successfully in the folder.");
    } catch (error) {
      console.error("Error creating file:", error);
    }
  }

  async function handleFileOperations() {
    try {
      const directoryHandle = await getDirectoryHandle();

      if (directoryHandle) {
        await createFileInFolder(directoryHandle);

        alert("File 'tasksdaily.txt' created successfully in the folder.");
      } else {
        alert("No directory selected.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  }

  async function writeToTextFile() {
    try {
      const handle = await window.showSaveFilePicker({
        types: [
          {
            description: "Text Files",
            accept: {
              "text/plain": [".txt"],
            },
          },
        ],
      });
  
      const writable = await handle.createWritable();
  
      for (const item of data) {
        await writable.write(JSON.stringify(item) + "\n");
      }
  
      await writable.close();
  
      console.log("Data appended to the file successfully.");
    } catch (error) {
      console.error("Error appending data to the file:", error);
    }
  }

  fileButton.addEventListener("click", writeToTextFile);
} else {
  console.error("Directory System API is not supported in this browser.");
}

// Get the current date
const currentDate = new Date();

// Format the current date as YYYY-MM-DD
const year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
month = month < 10 ? "0" + month : month; // Add leading zero if needed
let day = currentDate.getDate();
day = day < 10 ? "0" + day : day; // Add leading zero if needed

// Set the formatted current date as the value of the input field
document.getElementById("taskDate").value = `${year}-${month}-${day}`;

// form data manipulation
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form input values
    const taskText = document.getElementById("taskText").value;
    const status = document.getElementById("status").value;
    const taskDate = document.getElementById("taskDate").value;
    const description = document.getElementById("description").value;
    const timeConsumed = document.getElementById("timeConsumed").value;

    // create and push object
    const currentObject = {
      date: taskDate,
      task: taskText,
      status: status,
      time: timeConsumed,
      description: description,
    };
    data.push(currentObject);
    renderTable();
    // You can perform further actions here, such as sending the data to a server or updating the UI
  });
