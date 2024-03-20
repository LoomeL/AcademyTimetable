/*export const fetchSfuTT = async (group) => {
    const response = await fetch(`https://edu.sfu-kras.ru/api/timetable/get&target=${group}`)
    if (response.ok) {
        return await response.json()
    }

}*/

export const fetchSfuTT = (group) => fetch(`https://edu.sfu-kras.ru/api/timetable/get&target=${group}`)
    .then(response => response.json())

export const fetchAutoComplete = async (str) => {
    const response = await fetch(`https://edu.sfu-kras.ru/api/timetable/autocomplete_new/${str}`)
    if (response.ok) {
        return await response.json()
    }
}

export const fetchAitTT = (group) => {

}

export const fetchAitGroups = () => {

}