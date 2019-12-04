<template>
    <section class="transactions">
        <h2>{{ $t('transactions.title') }}</h2>

        <article>
            <p>
                {{ $t('transactions.description') }}: №
                <b>{{ cards.card_number }}</b>
            </p>
        </article>

        <div class="transactions__table">
            <table>
                <thead>
                    <tr>
                        <th>{{ $t('transactions.payment') }}</th>
                        <th>{{ $t('transactions.amount') }}</th>
                        <th>{{ $t('transactions.period') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in transactions" :key="index">
                        <td data-label="Payment">{{ item.description }}</td>
                        <td data-label="Amount">{{ item.amount }}</td>
                        <td data-label="Period">{{ item.processed_at }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            cards: state => state.cards || false,
            transactions: state => state.transactions,
        }),
    },
    methods: {
        ...mapActions(['getCards', 'getTransactions']),
        cardData() {
            // return the Promise from the action
            this.getCards({ self: this })
        },
        transactionsData() {
            this.getTransactions()
        },
    },
    async mounted() {
        // If we didn't already do it on the server we fetch the item (will first show the loading text)
        await this.cardData()
        await this.transactionsData()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
