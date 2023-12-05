function formatDateToYYYYMMDD(newValue) {
  const date = new Date(newValue?.$d);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function formatDate(inputDate) {
  if (!inputDate) {
    return '-'; // Return an empty string if inputDate is null, undefined, or empty
  }
  else{
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const parts = inputDate?.split('-'); // Split the date string
  const year = parts[0];
  const month = months[parseInt(parts[1]) - 1]; // Convert month number to month name
  const day = parts[2];

  return `${month} ${day} ${year}`;
}
}

export {formatDateToYYYYMMDD,formatDate}