import axios from '../../common/api'

const state = {
    data: {},
    status: [],
    success: false,
}

const getters = {
    responseData: state => (state.data ? state.data : null),
    responseStatus: state => (state.status ? state.status : null),
    responseSuccess: state => (state.success ? state.success : false),
}

const actions = {
    async profile({ commit }) {
        axios.init()

        await axios
            .get('https://services.embily.com/api/v1/profile.json')
            .then(response => {
                commit('profileData', response.data.profile)
            })
    },
    async updateProfile({ commit, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true

        axios.init()

        await axios
            .post('https://services.embily.com/api/v1/profile.json', data)
            .then(response => {
                commit('profileData', response.data.profile)

                commit('profileSuccess')

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },
    async status({ commit, dispatch, rootState }) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        axios.init()

        await axios
            .get('https://services.embily.com/api/v1/profile/statuses.json')
            .then(response => {
                commit('profileStatus', response.data.statuses)

                dispatch('Profile/profile', null, { root: true })

                setTimeout(() => {
                    // Remove the token and remove axios header from /common/api
                    rootState.loader = false
                }, 300)
            })
    },
}

const mutations = {
    profileData(state, data) {
        state.data = data
    },
    profileStatus(state, data) {
        state.status = data
    },
    profileSuccess(state) {
        state.success = true
        setTimeout(() => {
            // router.push('/')
            state.success = false
        }, 9000)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
