import FileSaver from "file-saver";
import XLSX from "xlsx";

function exportJson2Excel (data, fileName, sheetName) {
    const sheet = XLSX.utils.json_to_sheet(data)
    FileSaver.saveAs(new Blob([sheet2Blob(sheet, sheetName)], { type: 'application/octet-stream;charset=utf-8' }), fileName)
  }
  
  function sheet2Blob (sheet, sheetName) {
    sheetName = sheetName || 'sheet1'
    const workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    }
    workbook.Sheets[sheetName] = sheet
    // 生成excel的配置项
    const wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    }
    const wbout = XLSX.write(workbook, wopts)
    const blob = new Blob([string2ArrayBuffer(wbout)], { type: 'application/octet-stream' })
    return blob
  }
  
  // 字符串转ArrayBuffer
  function string2ArrayBuffer (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }


  export default exportJson2Excel