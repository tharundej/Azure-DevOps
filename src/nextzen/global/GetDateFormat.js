export default function formatDateToYYYYMMDD(newValue) {
  const date = new Date(newValue?.$d);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
