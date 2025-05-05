function formatDate(timeStamp) {
    const addZero = (num) => {
        return num < 10 ? '0' + num : num;
    };
    let date = new Date(timeStamp);
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let seconds = addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export {
    formatDate,
};