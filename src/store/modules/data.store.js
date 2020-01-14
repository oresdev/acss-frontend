import storage from '../../common/storage'

import axios from '../../common/api'

import router from '../../router'

const state = {
    data: storage.get('session_data'),
    transactions: '',
    pin: '',
    error: '',
}

const getters = {
    responseData: state => (state.data ? state.data : null),
    responseError: state => (state.error ? state.error : false),
    transactionsData: state => (state.transactions ? state.transactions : null),
    pinData: state => (state.pin ? state.pin : null),
}

const actions = {
    async account({ commit, dispatch }) {
        axios.init()

        await axios
            .get('https://cards.acss.tech/api/v1/cards.json')
            .then(response => {
                const authenticate = storage.get('session_data')
                    ? storage.get('session_data').authenticate
                        ? storage.get('session_data').authenticate
                        : false
                    : false

                commit('accountData', response.data.cards[0])

                authenticate
                    ? ''
                    : response.data.cards[0]
                    ? router.push('/cabinet')
                    : router.push('/create')

                dispatch('Data/wallet', null, { root: true })
            })
            .catch(error => {
                commit('Session/responseError', 'submited', { root: true })

                axios.close()
            })
    },

    async wallet({ commit, dispatch }) {
        await axios
            .get('https://cards.acss.tech/api/v1/users/me.json')
            .then(response => {
                commit('walletData', response.data)

                dispatch('Data/transactions', null, { root: true })
            })
    },

    async transactions({ commit, dispatch }) {
        const uuid = storage.get('session_data')
            ? storage.get('session_data').wallet
                ? storage.get('session_data').wallet.uuid
                : false
            : false

        uuid
            ? await axios
                  .get(
                      'https://cards.acss.tech/api/v1/wallets/' +
                          uuid +
                          '/transactions.json'
                  )
                  .then(response => {
                      commit(
                          'transactionsData',
                          response.data.wallet.transactions
                      )
                  })
            : ''

        dispatch('Data/pincode', null, { root: true })
    },

    async pincode({ commit }) {
        const uuid = storage.get('session_data')
            ? storage.get('session_data').card
                ? storage.get('session_data').card.uuid
                : false
            : false

        uuid
            ? await axios
                  .get(
                      'https://cards.acss.tech/api/v1/cards/' +
                          uuid +
                          '/pin.json'
                  )
                  .then(response => {
                      commit('pinData', response.data.pin)
                  })
            : ''
    },

    /**
     * Create card.
     *
     *
     **/
    async attach({ commit, dispatch, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        axios.init()

        await axios
            .post('https://cards.acss.tech/api/v1/cards/attach.json', data)
            .then(response => {
                commit('successAttached')
                dispatch('Data/account', null, { root: true })

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
            .catch(error => {
                commit('responseError', 'exist')
                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },

    async detach({ commit, rootState }) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        axios.init()

        await axios
            .post('https://cards.acss.tech/api/v1/cards/detach.json')
            .then(response => {
                commit('successDetached')

                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },

    /**
     * Create card.
     *
     *
     **/
    async settings({ commit, dispatch, rootState }, data) {
        // Remove the token and remove axios header from /common/api
        rootState.loader = true
        axios.init()

        await axios
            .post('https://cards.acss.tech/api/v1/users/me.json', data)
            .then(response => {
                // Remove the token and remove axios header from /common/api
                rootState.loader = false

                dispatch('Session/sessionClose', null, { root: true })
            })
            .catch(error => {
                commit('responseError', 'empty')
                // Remove the token and remove axios header from /common/api
                rootState.loader = false
            })
    },
}

const mutations = {
    accountData(state, data) {
        data
            ? storage.set('session_data', {
                  card: {
                      uuid: data.uuid,
                      number: data.card_number,
                      holder: data.full_name,
                  },
                  wallet: {
                      uuid: data.wallets[0].uuid,
                      currency: data.wallets[0].currency,
                      balance: data.wallets[0].balance,
                      bitcoin: {
                          address: data.btc_address,
                      },
                      ethereum: {
                          address: data.eth_address,
                      },
                      tether: {
                          address: data.usdt_address,
                      },
                      acss: {
                          address: data.acss_address,
                      },
                  },
                  authenticate: true,
              })
            : null
        state.data = storage.get('session_data')
    },

    walletData(state, data) {
        data
            ? storage.set('session_data', {
                  deposit: {
                      acss: {
                          address: data.user.deposit_acss_address,
                          balance: data.user.deposit_acss_income,
                          equivalent: data.user.deposit_acss_usd_equivalent,
                      },
                  },
              })
            : null
        state.data = storage.get('session_data')
    },

    transactionsData(state, data) {
        state.transactions = data
    },

    pinData(state, data) {
        state.pin = data
    },

    responseError(state, error) {
        state.error = error

        setTimeout(() => {
            state.error = false
        }, 6000)
    },
    successAttached(state) {
        state.data = storage.get('session_data')
    },
    successDetached(state) {
        storage.set('session_data', {
            card: null,
            wallet: null,
            authenticate: null,
        })
        state.data = storage.get('session_data')

        router.push('/create')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
