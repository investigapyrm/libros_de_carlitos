const SPREADSHEET_ID = '1y5d5aIUYQItqP9rsX7wv-oMb3oqDbx8AKLQo11aAPco';
const SHEET_NAME = 'Hoja 1';

function doGet(e) {
  const callback = e && e.parameter ? e.parameter.callback : '';
  const payload = getBookPayload_();
  const json = JSON.stringify(payload);

  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function getBookPayload_() {
  try {
    const items = getBookRows_();
    return {
      ok: true,
      title: 'Carlitos y los residuos que se convierten en oportunidad',
      subtitle: 'Una historia sobre separar, aprender, emprender y cuidar el ambiente',
      sourceLabel: 'Google Sheets / GAS',
      rightsNote: 'Borrador interno. La figura de Carlitos y los materiales fuente requieren autorizacion de uso antes de cualquier publicacion.',
      items,
      generatedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      ok: false,
      error: err && err.message ? err.message : String(err),
      generatedAt: new Date().toISOString(),
    };
  }
}

function getBookRows_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(`No se encontro la hoja "${SHEET_NAME}".`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((header) => String(header).trim());
  return values
    .slice(1)
    .filter((row) => row.some((cell) => String(cell).trim() !== ''))
    .map((row) => rowToObject_(headers, row))
    .sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0));
}

function rowToObject_(headers, row) {
  return headers.reduce((obj, header, index) => {
    obj[header] = row[index] === undefined || row[index] === null
      ? ''
      : row[index];
    return obj;
  }, {});
}
