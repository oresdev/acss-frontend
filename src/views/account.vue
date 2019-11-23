<template>
   <section class="cards">
      <h2>{{ $t('account.title') }}</h2>

      <article>
         <p>{{ $t('account.description') }}</p>
      </article>

      <div class="cards-items">
         <div class="cards-items__item cards-group">
            <div class="cards-group__item">
               <p>
                  {{ wallets.currency || 'USD' }} {{ $t('account.balance') }}
               </p>

               <p>
                  <span>{{ wallets.balance || 0 }}</span>
                  {{ $t('account.card-number') }}: №
                  <b>{{ cards.card_number || '--- --- --- ---' }}</b>
               </p>

               <button class="cards-items__link" @click="getPin()">
                  {{ $t('account.pin') }}
               </button>

               <button
                  v-if="cards.alipay_address"
                  class="cards-items__button"
                  @click="showAlipay = !showAlipay"
               >
                  {{ $t('account.top-up') }} ALIPAY
               </button>

               <router-link
                  class="cards-items__button"
                  to="/transactions"
                  tag="button"
                  >{{ $t('account.transactions') }}</router-link
               >
            </div>

            <div class="cards-group__item">
               <figure>
                  <img src="@/assets/union__cardsgold.png" alt="" />
               </figure>

               <figure>
                  <img src="@/assets/union__cards.png" alt="" />
               </figure>
            </div>
         </div>
      </div>

      <div class="cards-items">
         <div class="cards-items__item">
            <p amount="222">{{ $t('account.limit') }}</p>

            <p>
               <span>13000$</span>
            </p>

            <p class="">
               {{ $t('account.details') }}
            </p>

            <progressBar v-bind:balance="wallets.balance || 0" />
         </div>
      </div>

      <div class="cards-items">
         <div class="cards-items__item">
            <p>{{ $t('account.top-up') }} Bitcoin</p>

            <p>
               <small>{{ cards.btc_address || '--- --- --- ---' }}</small>
            </p>

            <button class="cards-items__button" @click="showBTC = !showBTC">
               {{ $t('account.generate') }} QR
            </button>
         </div>

         <div class="cards-items__item">
            <p>{{ $t('account.top-up') }} Ethereum</p>

            <p>
               <small>{{ cards.eth_address || '--- --- --- ---' }}</small>
            </p>

            <button class="cards-items__button" @click="showETH = !showETH">
               {{ $t('account.generate') }} QR
            </button>
         </div>
      </div>

      <div
         class="cards-items"
         v-if="cards.usdt_omni_address || cards.usdt_eth_address"
      >
         <div class="cards-items__item" v-if="cards.usdt_omni_address">
            <p>{{ $t('account.top-up') }} USDT OMNI</p>

            <p>
               <small>{{ cards.usdt_omni_address || '--- --- --- ---' }}</small>
            </p>

            <button
               v-if="cards.usdt_omni_address"
               class="cards-items__button"
               @click="showUsdtOmni = !showUsdtOmni"
            >
               {{ $t('account.generate') }} QR
            </button>
         </div>

         <div class="cards-items__item" v-if="cards.usdt_eth_address">
            <p>{{ $t('account.top-up') }} USDT ETH</p>

            <p>
               <small>{{ cards.usdt_eth_address || '--- --- --- ---' }}</small>
            </p>

            <button
               v-if="cards.usdt_eth_address"
               class="cards-items__button"
               @click="showUsdtEth = !showUsdtEth"
            >
               {{ $t('account.generate') }} QR
            </button>
         </div>
      </div>

      <popup v-if="showPin" @close="showPin = false">
         <div slot="body">
            <span>{{ pincode }}</span>
         </div>
      </popup>

      <popup
         v-if="showAlipay"
         v-bind:qr_data="cards.alipay_address"
         @close="showAlipay = false"
      >
         <div slot="body">
            {{ cards.alipay_address || '--- --- --- ---' }}
         </div>
      </popup>

      <popup
         v-if="showBTC"
         v-bind:qr_data="cards.btc_address"
         @close="showBTC = false"
      >
      </popup>

      <popup
         v-if="showETH"
         v-bind:qr_data="cards.eth_address"
         @close="showETH = false"
      >
      </popup>

      <popup
         v-if="showUsdtOmni"
         v-bind:qr_data="cards.usdt_omni_address"
         @close="showUsdtOmni = false"
      >
      </popup>

      <popup
         v-if="showUsdtEth"
         v-bind:qr_data="cards.usdt_eth_address"
         @close="showUsdtEth = false"
      >
      </popup>
   </section>
</template>

<script>
import popup from '@/components/popup.vue'
import progressBar from '@/components/progressBar.vue'

export default {
   components: {
      popup,
      progressBar,
   },
   data() {
      return {
         showPin: false,
         showAlipay: false,
         showBTC: false,
         showETH: false,
         showUsdtEth: false,
         showUsdtOmni: false,
      }
   },
   methods: {
      async getPin() {
         const result = await this.$store
            .dispatch('pincode')
            .then(() => (this.showPin = true))
      },
   },
   computed: {
      pincode() {
         return this.$store.state.pincode
      },
      cards() {
         return this.$store.state.cards
      },
      wallets() {
         return this.$store.state.wallets
      },
   },
   async created() {
      const result = await this.$store.dispatch('cards')
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
