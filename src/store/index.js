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
        pincode: {},
        profile: {},
        user: {},
        transactions: {},
    },
    mutations: {
        dataCards(state, cards) {
            state.cards = cards
            state.wallets = cards.wallets[0]
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
        sending_success(state, user) {
            state.status = 'success'
            state.user = user
        },
        sending_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.email = ''
        },
        pincode(state, pincode) {
            state.pincode = pincode
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
        profile({ commit }, user) {
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

                        commit('sending_success', user)

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('sending_error', err)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },

        getProf({ commit }) {
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
                        commit('auth_error', err)

                        // localStorage.removeItem('authentication_token')
                        // localStorage.removeItem('user_email')

                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')

                localStorage.removeItem('authentication_token')
                localStorage.removeItem('user_email')
                localStorage.removeItem('language')

                delete axios.defaults.headers.common['Authorization']

                resolve()
            })
        },
        cards({ commit }) {
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
        pincode({ commit, state }, cards) {
            return new Promise((resolve, reject) => {
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
                })
                    .then(resp => {
                        const pincode = resp.data.pin
                        commit('pincode', pincode)

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
        transactions({ commit, state }, wallets) {
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
    },
})
