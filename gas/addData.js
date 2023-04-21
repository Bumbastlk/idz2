// Замініть "ID_таблиці" на ID своєї гугловської таблиці та "Назва_аркуша" на назву аркуша, де ви хочете додати дані.
const SPREADSHEET_ID = "1ZsNzWK4TbJtB3xvHwKvdb61UIQ1vAm9IqWVcTBnCCEw";
const SHEET_NAME = "page1";

function addData() {
  const data = document.getElementById("dataInput").value;
  
  // Створюємо запит до Google Apps Script API
  const url = `https://script.google.com/macros/s/AKfycbzhzBzvwbQbkbjaMY9QNPq2dp1CIuE3K_XmPdiVJbKA_8p33aSqVNUZBlSo9CJjpC1E/exec?data=${data}&sheet=${SHEET_NAME}&id=${SPREADSHEET_ID}`;
  
  fetch(url)
    .then(response => response.text())
    .then(data => {
      console.log(data);
      updateTable();
    })
    .catch(error => {
      console.error(error);
    });
}

function updateTable() {
  // Створюємо запит до Google Apps Script API для отримання даних з таблиці
  const url = `https://script.google.com/macros/s/AKfycbzhzBzvwbQbkbjaMY9QNPq2dp1CIuE3K_XmPdiVJbKA_8p33aSqVNUZBlSo9CJjpC1E/exec?sheet=${SHEET_NAME}&id=${SPREADSHEET_ID}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const tableData = document.getElementById("tableData");
      tableData.innerHTML = "";
      data.forEach(row => {
        const rowData = document.createElement("p");
        rowData.innerText = row.join(" | ");
        tableData.appendChild(rowData);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function doGet(e) {
    const sheetName = e.parameter.sheet;
    const id = e.parameter.id;
    const sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
  
    if (e.parameter.data) {
      const rowData = [e.parameter.data.split(",")];
  sheet.appendRow(rowData);
  return ContentService.createTextOutput("Рядок додано до таблиці.");
  } else {
  const data = sheet.getDataRange().getDisplayValues();
  return ContentService.createTextOutput(JSON.stringify(data));
  }
  }
