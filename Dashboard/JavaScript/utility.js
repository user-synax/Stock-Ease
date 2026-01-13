const PreviewTime = document.getElementById("dateAndTime")

setInterval(() => {
    let date = new Date()
    let Hour = date.getHours()
    let Minute = date.getMinutes()
    let Second = date.getSeconds()
    PreviewTime.textContent = `${Hour} : ${Minute} : ${Second}`
}, 1000)