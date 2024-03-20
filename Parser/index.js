const csv = require("csv-parser")
const fs = require("fs")
const { resourceUsage } = require("process")

const months = {
    января: 1,
    февраля: 2,
    марта: 3,
    апреля: 4,
    мая: 5,
    июня: 6,
    июля: 7,
    августа: 8,
    сентября: 9,
    октября: 10,
    ноября: 11,
    декабря: 12,
}

let output = []

let currentDate = ""

fs.createReadStream("input.csv")
    .pipe(
        csv({
            headers: false,
            skipLines: 5,
        })
    )
    .on("data", (data) => {
        if (data[0] !== "") currentDate = parseDate(data[0])

        if (currentDate == "Дата" && currentDate == "") return
        if (data[4] !== "") appendResult("АИТ22-01", data[4], data[3])
        if (data[5] !== "") appendResult("АИТ22-02", data[5], data[3])
        if (data[6] !== "") appendResult("АИТ22-03", data[6], data[3])
        if (data[7] !== "") appendResult("АИТ22-04", data[7], data[3])
        if (data[8] !== "") appendResult("АИТ22-05", data[8], data[3])
        if (data[11] !== "") appendResult("АИТ23-01", data[11], data[3])
        if (data[12] !== "") appendResult("АИТ23-02", data[12], data[3])
        if (data[13] !== "") appendResult("АИТ23-03", data[13], data[3])
    })
    .on("end", () => {
        console.log("CSV file successfully processed")
        fs.writeFileSync("output.json", JSON.stringify(output, null, 4))
    })

function appendResult(group, task, time) {
    let data = task.replace("\n", "").match(/(.*)УЛК(.*)/)
    output.push({
        date: currentDate,
        time: time.replaceAll(" ", ""),
        subject: data == null ? task : data[1].trim(),
        teacher: "",
        place: data == null ? "" : "Корпус №17, ауд. " + data[2].trim(),
        building: data == null ? "" : "Корпус №17",
        room: data == null ? "" : data[2].trim(),
        group: group,
    })

    /*{
      subject: "Мобильные приложения",
      timeFrom: "",
      timeTo: "",
      type: "",
      sync: "",
      building: "",
      room: "",
      place: "",
      links: []
    }*/
}

function parseDate(dateString) {
    const parts = dateString.split(" ")
    const day = parseInt(parts[0], 10)
    const month = months[parts[1]]
    const year = parseInt(parts[2], 10)

    return [year, month, day].join(".")
}
