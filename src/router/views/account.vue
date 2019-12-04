<template>
    <section class="cards">
        <h2>{{ $t('account.title') }}</h2>

        <div class="status" v-if="error">
            <div class="status__i status__i--error">
                {{ error }}
            </div>
        </div>

        <div class="cards-items" v-if="cards == false">
            <div class="cards-items__item cards-group centered" v-if="error == false">
                <div class="cards-group__item">
                    <article>
                        <p>{{ $t('account.description') }}</p>
                    </article>
                    <button class="cards-items__button" type="submit" v-on:click="createCard" :disabled="number.length != 19">{{ $t('account.snap') }}</button>
                </div>

                <div class="cards-group__item">
                    <div class="create">
                        <div class="create__i">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                                <defs />
                                <path d="M42 19H23V0h-4v19H0v4h19v19h4V23h19z" />
                            </svg> -->
                            <form class="card-form" v-on:submit.prevent>
                                <label class="card-form__label" for="number">
                                    <input class="card-form__input" type="text" v-model="number" placeholder="#### #### #### ####" />
                                </label>
                            </form>
                            <span class="create__status" v-if="number.length < 19">{{ $t('account.cardtype') }}</span>
                            <span class="create__status" v-if="number.length == 19">{{ $t('account.cardsuccess') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cards-items" v-if="cards != false">
            <div class="cards-items__item cards-group" v-if="error == false">
                <div class="cards-group__item">
                    <p>{{ $t('account.balance') }}</p>

                    <p>
                        <span>{{ wallets.balance || 0 }}{{ wallets.currency || 'USD' }}</span>
                        {{ $t('account.card-number') }}: №
                        <b>{{ cards.card_number || 'unavailable' }}</b>
                    </p>
                    <button class="cards-items__link" @click="generatePin()">
                        {{ $t('account.pin') }}
                    </button>

                    <button v-if="cards.alipay_address" class="cards-items__button" @click="showAlipay = !showAlipay">{{ $t('account.top-up') }} ALIPAY</button>

                    <router-link class="cards-items__button" to="/transactions" tag="button">{{ $t('account.transactions') }}</router-link>
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
            <div class="cards-items__item" v-if="cards.btc_address">
                <p>{{ $t('account.top-up') }} Bitcoin</p>

                <p>
                    <small>{{ cards.btc_address }}</small>
                </p>

                <button class="cards-items__button" @click="showBTC = !showBTC">{{ $t('account.generate') }} QR</button>
            </div>

            <div class="cards-items__item" v-if="cards.eth_address">
                <p>{{ $t('account.top-up') }} Ethereum</p>

                <p>
                    <small>{{ cards.eth_address }}</small>
                </p>

                <button class="cards-items__button" @click="showETH = !showETH">{{ $t('account.generate') }} QR</button>
            </div>
        </div>

        <div class="cards-items">
            <div class="cards-items__item" v-if="cards.usdt_omni_address">
                <p>{{ $t('account.top-up') }} USDT OMNI</p>

                <p>
                    <small>{{ cards.usdt_omni_address }}</small>
                </p>

                <button class="cards-items__button" @click="showUsdtOmni = !showUsdtOmni">{{ $t('account.generate') }} QR</button>
            </div>

            <div class="cards-items__item" v-if="cards.usdt_eth_address">
                <p>{{ $t('account.top-up') }} USDT ETH</p>

                <p>
                    <small>{{ cards.usdt_eth_address }}</small>
                </p>

                <button class="cards-items__button" @click="showUsdtEth = !showUsdtEth">{{ $t('account.generate') }} QR</button>
            </div>
        </div>

        <popup v-if="showPin" @close="showPin = false">
            <div slot="body">
                <span>{{ pin }}</span>
            </div>
        </popup>

        <popup v-if="showAlipay" v-bind:qr_data="cards.alipay_address" @close="showAlipay = false">
            <div slot="body">
                {{ cards.alipay_address || 'unavailable' }}
            </div>
        </popup>

        <popup v-if="showBTC" v-bind:qr_data="cards.btc_address" @close="showBTC = false"> </popup>

        <popup v-if="showETH" v-bind:qr_data="cards.eth_address" @close="showETH = false"> </popup>

        <popup v-if="showUsdtOmni" v-bind:qr_data="cards.usdt_omni_address" @close="showUsdtOmni = false"> </popup>

        <popup v-if="showUsdtEth" v-bind:qr_data="cards.usdt_eth_address" @close="showUsdtEth = false"> </popup>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    components: {
        popup: () => import('@/components/popup.vue'),
        progressBar: () => import('@/components/progressBar.vue'),
    },
    data() {
        return {
            showPin: false,
            showAlipay: false,
            showBTC: false,
            showETH: false,
            showUsdtEth: false,
            showUsdtOmni: false,
            number: '',
        }
    },
    methods: {
        ...mapActions(['cardCreate', 'cardDetach', 'getPin', 'getCards']),
        async createCard() {
            await this.cardCreate({ number: this.number.replace(/\s+/g, '') }).then(this.cardData())
        },
        async detachCard() {
            await this.cardDetach().then((this.$store.state.cards = false))
        },
        generatePin() {
            this.getPin().then(() => (this.showPin = true))
        },
        cardData() {
            // return the Promise from the action
            this.getCards({ self: this })
        },
    },
    computed: {
        ...mapState({
            cards: state => state.cards || false,
            pin: state => state.pin,
            wallets: state => state.wallets,
        }),
        ...mapGetters(['authenticationError']),
        error() {
            return this.authenticationError
        },
    },
    async mounted() {
        // If we didn't already do it on the server we fetch the item (will first show the loading text)
        await this.cardData()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
