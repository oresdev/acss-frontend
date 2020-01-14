import Vue from 'vue'

import app from './router/views/app'

import './common/components'

import router from './router'

import store from './store'

import i18n from './common/i18n'

// https://vuejs-tips.github.io/vue-the-mask/
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

// https://github.com/fengyuanchen/vue-qrcode
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(app),
}).$mount('#app')
