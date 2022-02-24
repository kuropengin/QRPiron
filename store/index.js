export const state = () => ({
    appAlert: false
})

export const mutations = {
    onAlert(state) {
        state.appAlert = true
    },
    offAlert(state) {
        state.appAlert = false
    }
}