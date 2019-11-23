import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import signin from '../views/signin.vue'
import signup from '../views/signup.vue'
import account from '../views/account.vue'
import profile from '../views/profile.vue'
import transactions from '../views/transactions.vue'
import settings from '../views/settings.vue'

Vue.use(Router)

let router = new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'signin',
         component: signin,
      },
      {
         path: '/signup',
         name: 'signup',
         component: signup,
      },
      {
         path: '/account',
         name: 'account',
         component: account,
         meta: {
            requiresAuth: true,
         },
      },
      {
         path: '/profile',
         name: 'profile',
         component: profile,
         meta: {
            requiresAuth: true,
         },
      },
      {
         path: '/transactions',
         name: 'transactions',
         component: transactions,
         meta: {
            requiresAuth: true,
         },
      },
      {
         path: '/settings',
         name: 'settings',
         component: settings,
         meta: {
            requiresAuth: true,
         },
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
