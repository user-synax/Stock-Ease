const PreviewTime = document.getElementById("dateAndTime")

setInterval(() => {
    let date = new Date()
    let timeShort = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: 'numeric',
        hour12: true,
    });
    PreviewTime.textContent = `${timeShort}`
}, 1000)

