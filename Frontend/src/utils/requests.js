export const fetchSfuTT = (group) =>
  fetch(`https://edu.sfu-kras.ru/api/timetable/get&target=${group}`).then((response) =>
    response.json()
  )

export const fetchAutoComplete = (str) =>
  fetch(`https://edu.sfu-kras.ru/api/timetable/autocomplete_new/${str}`).then((response) =>
    response.json()
  )

export const fetchInstitutes = () =>
  fetch('https://edu.sfu-kras.ru/api/timetable/get_insts').then((response) => response.json())

export const fetchAitTT = () => fetch('/output.json').then((response) => response.json())

export const fetchAitGroups = () => {}
