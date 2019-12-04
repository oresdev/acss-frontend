<template>
    <nav class="nav">
        <ul class="nav__brand">
            <router-link to="/" tag="li">
                ACSS
                <small>{{ $t('header.description') }}</small>
            </router-link>
        </ul>

        <ul class="nav__burger" @click="listOpen = !listOpen">
            <li></li>
            <li></li>
            <li></li>
        </ul>

        <!-- get navigation list from @/locales/**.json -->
        <ul class="nav__list" :class="{ 'nav__list--open': listOpen }" v-if="isLoggedIn">
            <li v-for="(item, i) in $t('header.nav.list')" :key="`item${i}`">
                <router-link :to="'/' + item.link">{{ item.title }}</router-link>
            </li>
        </ul>

        <ul class="nav__sub" :class="{ 'nav__sub--open': listOpen }">
            <li @click="subOpen = !subOpen">{{ $i18n.locale }}</li>
            <ul class="locale" v-if="subOpen">
                <li v-for="(locale, i) in $i18n.availableLocales" :key="`locale${i}`" @click="setLanguage(locale)">
                    {{ locale }}
                </li>
            </ul>
        </ul>

        <ul class="nav__link" :class="{ 'nav__link--open': listOpen }" v-if="isLoggedIn">
            <li @click="logout">{{ $t('header.link.logout') }}</li>
        </ul>

        <ul class="nav__link" :class="{ 'nav__link--open': listOpen }" v-if="!isLoggedIn">
            <router-link to="/signup" tag="li" v-if="this.$route.name === 'signin'">{{ $t('header.link.signup') }}</router-link>
            <router-link to="/" tag="li" v-if="this.$route.name === 'signup'">{{ $t('header.link.signin') }}</router-link>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return { listOpen: false, subOpen: false }
    },
    components: {},
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn
        },
    },
    methods: {
        setLanguage(locale) {
            this.$i18n.locale = locale
            this.subOpen = false

            localStorage.language = locale
        },
        logout: function() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/')
            })
        },
    },
    created: function() {
        this.$http.interceptors.response.use(undefined, function(err) {
            return new Promise(function(resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch('logout')
                }
                throw err
            })
        })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
