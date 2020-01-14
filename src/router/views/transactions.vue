<template>
    <div>
        <heading />

        <!--  -->
        <table class="grid__i">
            <thead>
                <tr>
                    <th v-text="$t('views.transactions.payment')" />

                    <th v-text="$t('views.transactions.amount')" />

                    <th v-text="$t('views.transactions.date')" />
                </tr>
            </thead>

            <tbody v-if="transactions">
                <tr v-for="(item, index) in transactions" :key="index">
                    <td
                        :data-label="$t('views.transactions.payment')"
                        v-text="item.description.replace(/;|\SUCC/g, ' ')"
                    />
                    <td
                        :data-label="$t('views.transactions.amount')"
                        v-text="item.amount"
                    />
                    <td
                        :data-label="$t('views.transactions.date')"
                        v-text="formatDate(item.processed_at)"
                    />
                </tr>
            </tbody>

            <tbody v-else>
                <tr>
                    <td v-text="$t(`views.transactions.empty`)" />
                    <td />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    methods: {
        formatDate(date) {
            var d = date
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('.')

            var t = date.slice(11, -5)

            return d + ' ' + t
        },
    },

    computed: {
        ...mapGetters({
            transactions: 'Data/transactionsData',
        }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
