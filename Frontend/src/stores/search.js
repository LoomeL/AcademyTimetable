import {computed, ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {computedAsync} from "@vueuse/core";
import {fetchAutoComplete, fetchInstitutes} from "@/utils/requests.js";
import {useNavigationStore} from "@/stores/navigation.js";

const institutesShortName = [
    ["Институт архитектуры и дизайна", "ИАиД"],
    ["Институт фундаментальной биологии и биотехнологии", "ИФБиБТ"],
    ["Институт космических и информационных технологий", "ИКИТ"],
    ["Институт торговли и сферы услуг", "ИТиСУ"],
    ["Институт Севера и Арктики", "ИСиА"],
    ["Военный учебный центр", "ВУЦ"],
    ["Военно-инженерный институт", "ВИИ"],
    ["Институт филологии и языковой коммуникации", "ИФиЯК"],
    ["Институт экономики, государственного управления и финансов", "ИЭГУиФ"],
    ["Институт нефти и газа", "ИНиГ"],
    ["Институт горного дела, геологии и геотехнологий", "ИГДГиГ"],
    ["Гуманитарный институт", "ГИ"],
    ["Инженерно-строительный институт", "ИСИ"],
    ["Институт математики и фундаментальной информатики", "ИМиФИ"],
    ["Политехнический институт", "ПИ"],
    ["Институт управления бизнес-процессами", "ИУБП"],
    ["Институт инженерной физики и радиоэлектроники", "ИИФиРЭ"],
    ["Институт физической культуры, спорта и туризма", "ИФКСиТ"],
    ["Институт педагогики, психологии и социологии", "ИППС"],
    ["Институт цветных металлов и материаловедения", "ИЦМиМ"],
    ["Институт экологии и географии", "ИЭиГ"],
    ["Институт гастрономии", "ИГ"],
    ["Юридический институт", "ЮИ"]
]

export const institutesShortNameObj = institutesShortName.reduce((obj, [full, short]) => {
    obj[full] = short;
    return obj;
}, {});

const reduceInstitutes = (inst) => {
    return inst.reduce((accumulator, item) => {
        const { institute, department, course } = item;

        if (!accumulator[institute]) {
            accumulator[institute] = {};
        }

        if (!accumulator[institute][department]) {
            accumulator[institute][department] = {};
        }

        if (!accumulator[institute][department][course]) {
            accumulator[institute][department][course] = [];
        }

        accumulator[institute][department][course].push(item.name);
        return accumulator;
    }, {});
}

export const useSearchStore = defineStore('search', () => {
    const searchValue = ref('')
    const selectedGroup = ref('')

    const autoCompleteData = computedAsync(async () => {
        if (searchValue.value === "") return []
        const data = await fetchAutoComplete(searchValue.value)
        return Object.keys(data).splice(0, 6)
    })

    const institutes = computedAsync(async () => {
        const data = await fetchInstitutes()
        return data ? reduceInstitutes(data) : {}
    })

    const loading = computed(() => {
        return Object.keys(institutes).length === 0
    })

    const nav = useNavigationStore()

    watch(selectedGroup, () => {
        nav.currentPage = 'SearchPage'
        window.scrollTo(0, 0)
    })
/*
    const fetchInstitutes = () =>  {
        setTimeout(async () => {
            const institutesResponse = await fetch("https://edu.sfu-kras.ru/api/timetable/get_insts")

            if (institutesResponse.ok) {
                rawInstitutes.value = await institutesResponse.json()
                institutes.value = reduceInstitutes(rawInstitutes.value)
            } else {
                rawInstitutes.value = []
            }
        }, 500)
    }*/

    return { searchValue, institutes, autoCompleteData, loading, selectedGroup }
})
