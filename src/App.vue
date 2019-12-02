<template>
    <div id="app">
        <header class="header">
            <navigation-header />
        </header>

        <main class="main">
            <router-view />
        </main>

        <footer class="footer">
            <small class="footer__copyright">
                {{ $t('footer.description') }}
            </small>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    components: {
        navigationHeader: () => import('@/components/navigationHeader.vue'),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/assets/sass/main';
</style>
