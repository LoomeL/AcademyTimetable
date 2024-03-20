import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";

export const useProfilesStore = defineStore("profiles", () => {
    const profiles = ref(JSON.parse(localStorage.getItem("profiles")) || [])

    const editorSelectedProfile = ref({})
    const selectedProfile = ref(profiles.value[0] || {})

/*    watch(editorSelectedProfile, (nv) => {
        if (Object.keys(nv).length === 0) return;
        const index = profiles.value.findIndex(i => i.id === nv.id)
        profiles.value.splice(index, 1, nv);
    }, {deep: true})*/

    watch(profiles, (nv) => {
        localStorage.setItem("profiles", JSON.stringify(nv))
    }, {deep: true})

    watch(selectedProfile, () => {
        window.scrollTo(0, 0)
    })

    const removeSelected = () => {
        if (Object.keys(editorSelectedProfile.value).length === 0) return;
        const index = profiles.value.findIndex(i => i.id === editorSelectedProfile.value.id)
        profiles.value.splice(index, 1);
        editorSelectedProfile.value = {}
    }

    const handleSave = () => {
        const index = profiles.value.findIndex(i => i.id === editorSelectedProfile.value.id)
        profiles.value.splice(index, 1, editorSelectedProfile.value);
        editorSelectedProfile.value = {}
    }

    return { profiles, editorSelectedProfile, selectedProfile, removeSelected, handleSave }
})