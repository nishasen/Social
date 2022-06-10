export const SetDate = (date) => {
    const convertingDate = new Date(date);
    const year = convertingDate.getFullYear()
    let month = Number(convertingDate.getMonth()) + 1
    let day = convertingDate.getDate()
    month = month.toString().length !== 2 ? "0" + month : month;
    day = day.toString().length !== 2 ? "0" + day : day;
    return day + "/" + month + "/" + year;
}