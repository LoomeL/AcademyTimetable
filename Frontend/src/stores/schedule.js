import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {fetchAitTT} from "@/utils/requests.js";
import {computedAsync} from "@vueuse/core";

export const useScheduleStore = defineStore("schedule", () => {
    const liveDate = ref(new Date())

    //TODO: МБ интервал должен отключаться при неиспользовании

    setInterval(() => {
        liveDate.value = new Date()
    }, 1000)

    const aitTT = computedAsync(async () => {
        return await fetchAitTT()
    }, [])

    const aitGroups = computed(() => {
        return [...new Set(aitTT.value.map(obj => obj.group))]
    })

    return {liveDate, aitTT, aitGroups}
})