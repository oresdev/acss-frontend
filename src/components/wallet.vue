<template>
    <div class="wallet">
        <router-link
            v-if="slug"
            class="wallet__link"
            :to="slug"
            v-text="title"
        />
        <span v-else class="wallet__link" v-text="title" />

        <p
            class="wallet__address text--muted"
            v-text="address ? address : `KYC required`"
        />

        <tumbler
            class="wallet__tumbler"
            :label="$t(`views.wallets.qr`)"
            :value="address ? title : `KYC required`"
            :address="address"
            modal
        />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: [String, Number],
            default: null,
        },
        slug: {
            type: String,
            default: null,
        },
        address: {
            type: [String, Number],
            default: null,
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
