<template>
    <div>
        <heading />

        <!--  -->
        <grid :title="$t('views.deposits.title')" update>
            <div class="grid__i">
                <p class="text--muted" v-text="$t('views.deposits.details')" />

                <br />

                <h2
                    v-text="
                        data.deposit.acss.balance +
                            ' ACC' +
                            ' / ' +
                            data.deposit.acss.equivalent +
                            ' USD'
                    "
                />
                <br />

                <tumbler
                    :label="$t(`views.wallets.qr`)"
                    :value="data.user.status_code ? `ACSS` : `KYC required`"
                    :address="
                        data.user.status_code ? data.deposit.acss.address : null
                    "
                    modal
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
