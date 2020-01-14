import Vue from 'vue'
import VueRouter from 'vue-router'

import storage from '../common/storage'

import signin from './views/signin'
import signup from './views/signup'
import recovery from './views/recovery'
import create from './views/create'
import settings from './views/settings'
import cabinet from './views/cabinet'
import bitcoin from './views/wallets/bitcoin'
import ethereum from './views/wallets/ethereum'
import tether from './views/wallets/tether'
import acss from './views/wallets/acss'
import kyc from './views/kyc'
import transactions from './views/transactions'
import _404 from './views/_404'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'signin',
            component: signin,
            meta: {
                public: true,
            },
        },
        {
            path: '/signup',
            name: 'signup',
            component: signup,
            meta: {
                public: true,
            },
        },
        {
            path: '/recovery',
            name: 'recovery',
            component: recovery,
            meta: {
                public: true,
            },
        },
        {
            path: '/settings',
            name: 'settings',
            component: settings,
        },
        {
            path: '/create',
            name: 'create',
            component: create,
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: cabinet,
            meta: {
                private: true,
            },
        },
        {
            path: '/wallets/bitcoin',
            name: 'wallets.bitcoin',
            component: bitcoin,
            meta: {
                private: true,
            },
        },
        {
            path: '/wallets/ethereum',
            name: 'wallets.ethereum',
            component: ethereum,
            meta: {
                private: true,
            },
        },
        {
            path: '/wallets/tether',
            name: 'wallets.tether',
            component: tether,
            meta: {
                private: true,
            },
        },
        {
            path: '/wallets/acss',
            name: 'wallets.acss',
            component: acss,
            meta: {
                private: true,
            },
        },
        {
            path: '/kyc',
            name: 'kyc',
            component: kyc,
            meta: {
                private: true,
            },
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: transactions,
            meta: {
                private: true,
            },
        },
        {
            path: '*',
            name: '404',
            component: _404,
            meta: {
                public: true,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    let isAuthorized = storage.get('session_data')
        ? storage.get('session_data').user
            ? storage.get('session_data').user.token
                ? storage.get('session_data').user.token
                : false
            : false
        : false

    let isCreated = storage.get('session_data')
        ? storage.get('session_data').card
            ? storage.get('session_data').card.uuid
                ? storage.get('session_data').card.uuid
                : false
            : false
        : false

    if (!to.matched.some(record => record.meta.public) && !isAuthorized) {
        return next({
            path: '/', // Store the full path to redirect the user to after login
        })
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (
        isAuthorized &&
        !isCreated &&
        to.matched.some(record => record.meta.private || record.meta.public)
    ) {
        return next('/create')
    }
    // Do not allow user to visit login page or register page if they are logged in
    if (
        isAuthorized &&
        isCreated &&
        to.matched.some(record => record.meta.public)
    ) {
        return next('/cabinet')
    }

    next()
})

export default router
