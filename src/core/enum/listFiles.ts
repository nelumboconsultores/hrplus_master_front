export enum ListFiles {
  pdf = '.pdf',
  jpeg = '.jpeg',
  jpg = '.jpg',
  png = '.png',
  xls = '.xls',
  xlsx = '.xlsx',
  doc = '.doc',
  docx = '.docx',
  csv = '.csv',
}

export const ListFilesSelect = [
  { value: ListFiles.pdf, label: 'PDF' },
  { value: ListFiles.jpeg, label: 'JPEG' },
  { value: ListFiles.jpg, label: 'JPG' },
  { value: ListFiles.png, label: 'PNG' },
  { value: ListFiles.xls, label: 'XLS' },
  { value: ListFiles.xlsx, label: 'XLSX' },
  { value: ListFiles.doc, label: 'DOC' },
  { value: ListFiles.docx, label: 'DOCX' },
  { value: ListFiles.csv, label: 'CSV' },
]
