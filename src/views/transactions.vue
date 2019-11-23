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
export default {
   data() {
      return {}
   },
   computed: {
      cards() {
         return this.$store.state.cards
      },
      transactions() {
         return this.$store.state.transactions
      },
   },
   async created() {
      const result = await this.$store.dispatch('cards')
      await this.$store.dispatch('transactions')
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
