function convertDate(raw) {
    const date = new Date(raw)
    return date.toDateString();
}