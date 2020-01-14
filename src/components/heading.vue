<template>
    <section class="heading">
        <h1 v-html="$t('views.' + this.$route.name + '.title')" />
        <p
            class="text--muted"
            v-html="$t('views.' + this.$route.name + '.subtitle')"
        />
    </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
