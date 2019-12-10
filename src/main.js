import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

// https://github.com/fengyuanchen/vue-qrcode
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

import i18n from './i18n'

Vue.prototype.$http = axios

const token = localStorage.getItem('authentication_token')

if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// https://vuejs-tips.github.io/vue-the-mask/
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
