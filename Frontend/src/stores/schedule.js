import {defineStore} from "pinia";
import {ref} from "vue";

export const useScheduleStore = defineStore("schedule", () => {
    const liveDate = ref(new Date())

    //TODO: МБ интервал должен отключаться при неиспользовании

    setInterval(() => {
        liveDate.value = new Date()
    }, 1000)

    return {liveDate}
})