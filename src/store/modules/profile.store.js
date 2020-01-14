import axios from '../../common/api'

const state = {
    data: {},
    status: [],
}

const getters = {
    responseData: state => (state.data ? state.data : null),
    responseStatus: state => (state.status ? state.status : null),
}

const actions = {
    async profile({ commit }) {
        axios.init()

        await axios
            .get('https://cards.acss.tech/api/v1/profile.json')
            .then(response => {
                commit('profileData', response.data.profile)
            })
    },
    async updateProfile({ commit }, data) {
        axios.init()

        await axios
            .post('https://cards.acss.tech/api/v1/profile.json', data)
            .then(response => {
                commit('profileData', response.data.profile)
            })
    },
    async status({ commit, dispatch, rootState }) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        axios.init()

        await axios
            .get('https://cards.acss.tech/api/v1/profile/statuses.json')
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
