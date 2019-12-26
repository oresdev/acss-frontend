import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'signin',
            component: () => import('@/router/views/signin.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/router/views/signup.vue'),
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('@/router/views/account.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/wallets',
            name: 'wallets',
            component: () => import('@/router/views/wallets.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/router/views/profile.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: () => import('@/router/views/transactions.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/router/views/settings.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/router/views/404.vue'),
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/')
    } else {
        if (store.getters.isLoggedIn) {
            if (to.name === 'signin') {
                // Redirect as i wish
                return next({ path: '/account' })
            }
            next()
        } else {
            next()
        }
    }
})

export default router
