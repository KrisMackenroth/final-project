
function CalculateAge(props) {
  const splity = props.split('-');
  const parsed = parseInt(splity[0]);
  const birthMonth = parseInt(splity[1]);
  const newDate = new Date();
  const stringDate = JSON.stringify(newDate);
  const splitDate = stringDate.split('-');
  const almost = splitDate[0].replace("'", '');
  const nearly = almost.replace('"', '');
  const currentMonth = parseInt(splitDate[1]);
  const month = currentMonth - birthMonth;
  const done = parseInt(nearly);
  let fullAge;
  if (Math.sign(month) === -1) {
    fullAge = done - parsed - 1;
  } else { fullAge = done - parsed; }
  return fullAge;
}

export default CalculateAge;
