<template>
    <section class="cards">
        <h2 v-text="$t('wallets.title')"></h2>

        <div class="status" v-if="error">
            <div class="status__i status__i--error">
                {{ error }}
            </div>
        </div>

        <div class="cards-items">
            <div class="cards-items__item cards-group" v-if="error == false">
                <div class="cards-group__item">
                    <p>{{ $t('account.balance') }}</p>

                    <p>
                        <span>{{ user.deposit_acss_income || 0 }} ACSS ( {{ user.deposit_acss_usd_equivalent || 0 }} USD )</span>
                    </p>
                    <p v-text="$t('wallets.topup')"></p>
                    <p style="word-break: break-word;">{{ user.deposit_acss_address }}</p>
                    <div class="buttons-group" style="display:flex; flex-wrap:wrap;">
                        <button class="cards-items__button" @click="showAcss = !showAcss">{{ $t('account.generate') }} QR</button>
                        <router-link class="cards-items__button" to="/wallets" tag="button" disabled v-text="$t('wallets.transaction')"></router-link>
                        <router-link class="cards-items__button" to="/wallets" tag="button" disabled v-text="$t('wallets.withdrawal')"></router-link>
                        <router-link class="cards-items__button" to="/wallets" tag="button" disabled v-text="$t('wallets.transfer')"></router-link>
                    </div>
                </div>
            </div>
        </div>

        <popup v-if="showAcss" v-bind:qr_data="user.deposit_acss_address" @close="showAcss = false"> </popup>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    components: {
        popup: () => import('@/components/popup.vue'),
    },
    data() {
        return {
            showAcss: false,
            number: '',
            error: false,
        }
    },
    methods: {
        ...mapActions(['getCards', 'getUserData']),
        cardData() {
            // return the Promise from the action
            this.getCards({ self: this })
        },
        userData() {
            // return the Promise from the action
            this.getUserData({ self: this })
        },
    },
    computed: {
        ...mapState({
            cards: state => state.cards || false,
            user: state => state.user || false,
            wallets: state => state.wallets,
        }),
    },
    async mounted() {
        // If we didn't already do it on the server we fetch the item (will first show the loading text)
        await this.cardData()
        // If we didn't already do it on the server we fetch the item (will first show the loading text)
        await this.userData()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
