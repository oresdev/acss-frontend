<template>
    <div>
        <heading />

        <!--  -->
        <grid :title="$t('views.deposits.title')" update>
            <div class="grid__i">
                <p class="text--muted" v-text="$t('views.deposits.details')" />

                <br />

                <h2 v-text="0.0 + ' USDT' + ' / ' + 0.0 + ' USD'" />
                <br />

                <tumbler
                    :label="$t(`views.wallets.qr`)"
                    :value="`Tether`"
                    :address="``"
                />
            </div>
        </grid>

        <!--  -->
        <grid :title="$t('views.transactions.title')">
            <div class="grid__i">
                <p class="text--muted" v-text="$t('views.deposits.soon')" />
            </div>
        </grid>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            data: 'Data/responseData',
        }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
