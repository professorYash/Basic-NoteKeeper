function convertUtcToIst(utcDate) {
  const parsedUtcDate = new Date(utcDate);

  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  // Format the date and time to IST
  const istDate = new Intl.DateTimeFormat('en-IN', options).format(parsedUtcDate);

  return istDate;
}

export default convertUtcToIst;