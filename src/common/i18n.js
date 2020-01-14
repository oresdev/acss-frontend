import Vue from 'vue'
import VueI18n from 'vue-i18n'

import storage from './storage'

Vue.use(VueI18n)

const getLocale = () => storage.get('session_data').locale

const getNavigatorLanguage = () =>
    (navigator.language || navigator.browserLanguage).toLowerCase().slice(3)

function loadMessages() {
    var locales = require.context(
        '../locales',
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    )
    var messages = {}
    locales.keys().forEach(key => {
        var matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            var locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}

export default new VueI18n({
    locale:
        getLocale() ||
        getNavigatorLanguage() ||
        process.env.VUE_APP_I18N_LOCALE ||
        'zh',
    fallbackLocale: 'zh',
    messages: loadMessages(),
})
