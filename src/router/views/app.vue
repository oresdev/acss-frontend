<template>
    <body id="app" :class="[{ blured: tour }]">
        <div class="loader" v-if="loader == true"></div>

        <header-nav />

        <main class="main">
            <router-view />
        </main>

        <footer class="footer">
            <p class="text--muted" v-text="`ACSS LLC`" />
        </footer>
    </body>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            tour: false,
        }
    },

    computed: {
        ...mapState({
            loader: 'loader',
        }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/assets/sass/main.scss';
</style>
