const fs = require("fs");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");

// for CSV file
const parseCSV = (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

// for XLS/XLSX file
const parseXlsx = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};

module.exports = { parseCSV, parseXlsx };
