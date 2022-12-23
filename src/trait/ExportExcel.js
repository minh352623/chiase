import * as XLSX from "xlsx/xlsx.mjs";

const ExportExcel = (data, nameSheet, nameFile) => {
  return new Promise((resolve, reject) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, nameSheet);
    XLSX.writeFile(wb, `${nameFile}.xlsx`);
    resolve("ok");
  });
};

export { ExportExcel };
