import storage from '../../common/storage'

import axios from '../../common/api'

import router from '../../router'

const state = {
    error: '',
    status: false,
}

const getters = {
    responseError: state => (state.error ? state.error : false),
    responseStatus: state => (state.status ? state.status : false),
}

const actions = {
    async session({ commit, dispatch, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        await axios
            .post('https://cards.acss.tech/api/v1/users/sign_in.json', data)
            .then(response => {
                commit('sessionData', response.data)

                axios.init()

                dispatch('Data/account', null, { root: true })
                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
            .catch(error => {
                commit('responseError', 'invalid')
                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },

    /**
     * Create new user.
     *
     *
     **/
    async sessionCreate({ commit, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        await axios
            .post('https://cards.acss.tech/api/v1/users/sign_up.json', data)
            .then(response => {
                commit('sessionSuccess')

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
            .catch(error => {
                commit('responseError', 'taken')
                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },

    /**
     * Recovery new user.
     *
     *
     **/
    async sessionRecovery({ commit, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        await axios
            .post(
                'https://cards.acss.tech/api/v1/users/temp_password.json',
                data
            )
            .then(response => {
                commit('sessionSuccess')

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },

    /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization <token>` header from requests.
     **/
    async sessionClose({ commit, rootState }) {
        axios.init()
        // Remove the token and remove axios header from /common/api
        rootState.loader = true

        await axios
            .delete('https://cards.acss.tech/api/v1/users/sign_out.json')
            .then(response => {
                // Remove the token and remove axios header from /common/api
                rootState.Data.data = null

                axios.close()

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
                router.push('/')
            })
    },

    sessionLocale({ commit }, locale) {
        storage.set('session_data', { locale: locale })
    },
}

const mutations = {
    sessionData(state, data) {
        storage.set('session_data', {
            user: {
                token: data.authentication_token,
                email: data.user.email,
                phone_country_code: data.user.phone_country_code,
                phone: data.user.phone,
                status_code: data.user.status_code,
                subscription: data.user.subscription_expires_at,
            },
            deposit: {
                acss: {
                    address: data.user.deposit_acss_address,
                    balance: data.user.deposit_acss_income,
                    equivalent: data.user.deposit_acss_usd_equivalent,
                },
            },
        })
    },

    responseError(state, error) {
        state.error = error
        setTimeout(() => {
            state.error = false
        }, 6000)
    },

    sessionSuccess(state) {
        state.status = true
        setTimeout(() => {
            router.push('/')
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
