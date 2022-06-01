export const SetDate = (date) => {
    const formattedDate = date.split(",")[0].split("/").map(char => char.length===1 ? "0"+char : char);
    const shiftDate = formattedDate.shift();
    formattedDate.splice(1, 0, shiftDate);
    const finalDate = formattedDate.join("-");
    return finalDate;
}