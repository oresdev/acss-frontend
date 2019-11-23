import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// export function loadLocale() {
//   const storageLocale = localStorage.locale
//   if (storageLocale) return storageLocale
//   const locale = (navigator.language || navigator.browserLanguage)
//     .toLowerCase()
//     .slice(3)

//   return locale
// }

function loadStorageLanguage() {
   const language = localStorage.language

   return language
}

function loadNavigatorLanguage() {
   const language = (navigator.language || navigator.browserLanguage)
      .toLowerCase()
      .slice(3)

   return language
}

function loadLocaleMessages() {
   const locales = require.context(
      '@/localization/locales',
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
   )
   const messages = {}
   locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
         const locale = matched[1]
         messages[locale] = locales(key)
      }
   })
   return messages
}

export default new VueI18n({
   locale: loadStorageLanguage() || loadNavigatorLanguage() || 'us',
   fallbackLocale: 'us',
   messages: loadLocaleMessages(),
})
