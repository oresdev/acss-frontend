<template>
    <header class="header">
        <figure class="header__i icon icon__brand">
            <router-link viewBox="0 0 671 548" width="55" tag="svg" to="/">
                <path
                    d="M0 548h156l263-420L342 0 0 548zm452-365L304 420h145l84 128h138L452 183z"
                />
            </router-link>
        </figure>

        <figure
            class="header__i icon icon__nav"
            hidden="hidden"
            v-on:click="visible = !visible"
        >
            <svg width="26" viewBox="0 0 18 12">
                <path d="M0 0h18v2H0zM0 5h18v2H0zM0 10h18v2H0z" />
            </svg>
        </figure>

        <nav :class="[{ visible: visible }, 'header__i nav']" v-if="session">
            <router-link
                v-if="!card"
                class="nav__i"
                to="/create"
                v-text="$t('views.create.title')"
            />

            <router-link
                v-if="card"
                class="nav__i"
                to="/cabinet"
                v-text="$t('views.cabinet.title')"
            />

            <router-link
                v-if="card"
                class="nav__i"
                to="/kyc"
                v-text="$t('views.kyc.title')"
            />

            <router-link
                class="nav__i"
                to="/settings"
                v-text="$t('views.settings.title')"
            />
        </nav>

        <ul :class="[{ visible: visible }, 'header__i locale']">
            <li class="locale__i">
                <span class="locale__link" v-on:click="submenu = !submenu">
                    {{ $i18n.locale }}
                </span>
            </li>

            <ul class="locale__i submenu" v-if="submenu">
                <li
                    class="submenu__i"
                    v-for="l in locales"
                    :key="l.id"
                    v-on:click="
                        sessionLocale(l), ($i18n.locale = l), (submenu = false)
                    "
                >
                    <span class="submenu__link">
                        {{ l }}
                    </span>
                </li>
            </ul>
        </ul>

        <nav :class="[{ visible: visible }, 'header__i nav']">
            <router-link
                v-if="routeName('signup', 'recovery', '404') && !session"
                class="nav__i"
                to="/"
                v-text="$t('views.signin.title')"
            />

            <router-link
                v-if="routeName('signin') && !session"
                class="nav__i"
                to="/signup"
                v-text="$t('views.signup.title')"
            />

            <span
                v-if="session"
                class="nav__i"
                v-text="$t('views.logout.title')"
                v-on:click="sessionClose"
            />
        </nav>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return { submenu: false, visible: false }
    },

    computed: {
        ...mapGetters({
            data: 'Data/responseData',
        }),
        locales: self =>
            self.$i18n.availableLocales.filter(l => l !== self.$i18n.locale),
        session: self => (self.data ? self.data.user : false),
        card: self => (self.data ? self.data.card : false),
    },

    methods: {
        ...mapActions('Session', ['sessionClose', 'sessionLocale']),

        routeName(...name) {
            return [...name].indexOf(this.$route.name) > -1
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
