class TimeClass {
  static getTime() {
    return new Date();
  }

  static getDay() {
    const day = new Date().getDate();
    return day < 10 ? "0" + day : day;
  }

  static getMonth() {
    const month = new Date().getMonth() + 1;
    return month < 10 ? "0" + month : month;
  }

  static getYear() {
    return new Date().getFullYear();
  }

  static getFormattedTime() {
    let day = new Date().getDate();
    day = day < 10 ? "0" + day : day;
    let month = new Date().getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = new Date().getFullYear();

    return `${year}-${month}-${day}`;
  }
}

class TableGenerator {
  static getColumns(obj) {
    return Object.keys(obj);
  }

  static formatAndAddColumns(table, columns) {
    columns.forEach((column) => {
      table += `<th>${column.charAt(0).toUpperCase() + column.slice(1)}</th>`;
    });
    return table;
  }

  static addRowsToTable(table, data, columns) {
    data.forEach((item) => {
      table += "<tr>";
      columns.forEach((column) => {
        table += `<td>${item[column]}</td>`;
      });
      table += "</tr>";
    });
    return table;
  }
}

function generateTable(data) {
  let table = "<table><tr>";

  const columns = TableGenerator.getColumns(data[0]);
  table = TableGenerator.formatAndAddColumns(table, columns);

  table += "</tr>";

  table = TableGenerator.addRowsToTable(table, data, columns);

  table += "</table>";

  return table;
}

function renderTable() {
  tableContainer.innerHTML = generateTable(data);
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

function convertToImage() {
  const dataTable = document.getElementById("table-container");
  html2canvas(dataTable, {
    onrendered: function (canvas) {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = image;
      downloadLink.download = "data_table_image.png";
      downloadLink.click();
    },
  });
}


const data = [
  {
    date: "20/01/2024",
    task: "learn html",
    status: "completed",
    time: "10",
    description: "so and so",
  },
];

tableContainer = document.getElementById("table-container");

renderTable();

document.getElementById("taskDate").value = TimeClass.getFormattedTime();

if ("showDirectoryPicker" in window) {
  fileButton.addEventListener("click", convertToImage);
} else {
  const msg = "System directory cannot be accessed through this browser!";
  console.log(msg);
  alert(msg);
}
