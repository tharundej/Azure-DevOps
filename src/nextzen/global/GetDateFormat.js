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


function formatDateBirthday(inputDate) {
  console.log(inputDate,'inputDateinputDate')

  if (!inputDate ||  inputDate===null || inputDate===undefined) {
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

  return `${month} ${day}`;
}
}

function parseCustomDateTime(dateTimeString) {
  const parts = dateTimeString.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Months are zero-based in JavaScript Date
  const day = parseInt(parts[2]);
  const timeParts = parts[3]?.split(':');
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);
  const second = parseInt(timeParts[2]);

  return new Date(year, month, day, hour, minute, second);
}

function formatDateTimeToYYYYMMDDHHMMSS(dateTimeString) {
  const date = parseCustomDateTime(dateTimeString);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

   console.log(date,"formattt")
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert hours to 12-hour format

  return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

// Usage example
const formattedDateTime = formatDateTimeToYYYYMMDDHHMMSS("2023-12-19-15:24:52");
console.log(formattedDateTime,"formattedd");


export {formatDateToYYYYMMDD,formatDate,formatDateBirthday,formatDateTimeToYYYYMMDDHHMMSS}