import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('authentication_token') || '',
        email: localStorage.getItem('user_email') || '',
        status: '',
        cards: {},
        wallets: {},
        pin: {},
        profile: {},
        user: {},
        error: '',
        transactions: {},
    },
    mutations: {
        dataCards(state, cards) {
            state.cards = cards
        },
        dataWallets(state, wallets) {
            state.wallets = wallets
        },
        setProf(state, profile) {
            state.profile = profile
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        error(state, error) {
            state.error = error
        },
        sending_success(state, user) {
            state.status = 'success'
            state.user = user
        },
        sending_error(state, error) {
            state.status = false
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.email = ''
        },
        dataPin(state, pin) {
            state.pin = pin
        },
        transactions(state, transactions) {
            state.transactions = transactions
        },
    },
    actions: {
        signin({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({
                    url: 'https://cards.acss.tech/api/v1/users/sign_in.json',
                    data: user,
                    method: 'POST',
                })
                    .then(resp => {
                        const token = resp.data.authentication_token
                        const user = resp.data.user

                        localStorage.setItem('authentication_token', token)
                        localStorage.setItem('user_email', user.email)

                        axios.defaults.headers.common['Authorization'] = token

                        commit('auth_success', token, user)

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
        signup({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({
                    url: 'https://cards.acss.tech/api/v1/users/sign_up.json',
                    data: user,
                    method: 'POST',
                })
                    .then(resp => {
                        const token = resp.data.authentication_token
                        const user = resp.data.user

                        localStorage.setItem('authentication_token', token)

                        axios.defaults.headers.common['Authorization'] = token

                        commit('auth_success', token, user)

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
        cardCreate({ commit }, data) {
            return new Promise(resolve => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/cards/attach.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                    data,
                    method: 'POST',
                }).then(response => {
                    resolve(response)
                })
            })
        },
        cardDetach({ commit }) {
            return new Promise(resolve => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/cards/detach.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                    method: 'POST',
                }).then(resp => {
                    resolve(resp)
                })
            })
        },
        settings({ commit }, user) {
            return new Promise((resolve, reject) => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/users/me.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                    data: user,
                    method: 'POST',
                })
                    .then(resp => {
                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        commit('logout')

                        router.push('/')
                        resolve()
                    })
                    .catch(err => {
                        commit('auth_error', err)

                        reject(err)
                    })
            })
        },
        setProfile({ commit }, user) {
            return new Promise((resolve, reject) => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                commit('auth_request')

                axios({
                    url: 'https://cards.acss.tech/api/v1/profile',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                    data: user,
                    method: 'POST',
                })
                    .then(resp => {
                        const user = resp.data.user
                        const error = resp.data.errors

                        commit('sending_success', user)

                        resolve(resp)
                    })
                    .catch(error => {
                        // commit('sending_error', err)
                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(error)
                    })
            })
        },

        getProfile({ commit }) {
            return new Promise((resolve, reject) => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/profile.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                })
                    .then(resp => {
                        const profile = resp.data.profile
                        commit('setProf', profile)

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('error', err.response.data.error)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise(resolve => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/users/sign_out.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                    method: 'DELETE',
                })
                localStorage.removeItem('authentication_token')
                localStorage.removeItem('user_email')
                localStorage.removeItem('language')

                delete axios.defaults.headers.common['Authorization']
                commit('dataCards', '')
                commit('dataWallets', '')
                commit('error', '')
                commit('logout')
                resolve()
            })
        },
        getCards({ commit }) {
            return new Promise((resolve, reject) => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')

                axios({
                    url: 'https://cards.acss.tech/api/v1/cards.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                })
                    .then(resp => {
                        const cards = resp.data.cards[0]
                        commit('dataCards', cards)
                        if (cards) {
                            const wallets = cards.wallets[0]
                            commit('dataWallets', wallets)
                        }

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('error', err.response.data.error)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
        getPin({ commit, state }) {
            return new Promise(resolve => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')
                const uuid = state.cards.uuid

                axios({
                    url: 'https://cards.acss.tech/api/v1/cards/' + uuid + '/pin.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                }).then(resp => {
                    commit('dataPin', resp.data.pin)

                    resolve(resp)
                })
            })
        },
        getTransactions({ commit, state }) {
            return new Promise((resolve, reject) => {
                const email = localStorage.getItem('user_email')
                const token = localStorage.getItem('authentication_token')
                const uuid = state.wallets.uuid

                axios({
                    url: 'https://cards.acss.tech/api/v1/wallets/' + uuid + '/transactions.json',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-USER-EMAIL': email,
                        'X-USER-TOKEN': token,
                    },
                })
                    .then(resp => {
                        const transactions = resp.data.wallet.transactions
                        commit('transactions', transactions)

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getProfile: state => state.profile, // If should decode request data
        authenticationError: state => state.error, // If should decode request data
    },
})
