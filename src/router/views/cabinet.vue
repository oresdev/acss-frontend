<template>
    <div>
        <heading />

        <!--  -->
        <grid
            :column="2"
            :title="$t(`views.balance.subtitle`)"
            :helper="$t(`views.balance.helper`)"
            push
            update
        >
            <div class="grid__i">
                <p
                    class="text--muted"
                    v-text="$t(`views.balance.reference`) + data.card.uuid"
                />

                <br />

                <h2 v-text="data.wallet.balance + ' ' + data.wallet.currency" />
                <br />

                <tumbler
                    :label="$t(`views.balance.pin`)"
                    :value="pin ? pin : $t(`views.balance.inactive`)"
                    :address="``"
                    modal
                    pin
                />
            </div>

            <visa
                :number="data.card.number"
                :holder="data.card.holder"
                :expires="``"
            />
        </grid>

        <!--  -->
        <!-- <button
            type="button"
            class="button button-default"
            v-on:click="detachData()"
            v-text="`Отвязать карту`"
        /> -->

        <!--  -->
        <grid
            :column="4"
            :title="$t(`views.wallets.title`)"
            :helper="$t(`views.wallets.helper`)"
            update
        >
            <wallet
                :title="`Bitcoin`"
                :slug="`wallets/bitcoin`"
                :address="
                    data.user.status_code ? data.wallet.bitcoin.address : null
                "
            />
            <wallet
                :title="`Ethereum`"
                :slug="`wallets/ethereum`"
                :address="
                    data.user.status_code ? data.wallet.ethereum.address : null
                "
            />
            <wallet
                :title="`Tether`"
                :slug="`wallets/tether`"
                :address="
                    data.user.status_code ? data.wallet.tether.address : null
                "
            />
            <wallet
                :title="`Acss`"
                :slug="`wallets/acss`"
                :address="
                    data.user.status_code
                        ? `Temporarily unavailable for card recharge`
                        : null
                "
            />
        </grid>

        <!--  -->
        <grid
            v-if="!data.user.subscription"
            :title="$t(`views.subscription.title`)"
        >
            <div class="grid__i">
                <p
                    class="text text--muted"
                    v-html="$t(`views.subscription.message`)"
                />

                <button
                    type="button"
                    class="button button-default"
                    v-text="$t(`views.subscription.link`)"
                />
            </div>
        </grid>

        <!--  -->
        <grid
            :title="$t(`views.transactions.title`)"
            :helper="$t(`views.transactions.helper`)"
            update
        >
            <table class="grid__i">
                <thead>
                    <tr>
                        <th v-text="$t('views.transactions.payment')" />

                        <th v-text="$t('views.transactions.amount')" />

                        <th v-text="$t('views.transactions.date')" />
                    </tr>
                </thead>

                <tbody v-if="transactions && transactions != false">
                    <tr
                        v-for="(item, index) in transactions.slice(0, 1)"
                        :key="index"
                    >
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

                    <router-link
                        :to="'/transactions'"
                        v-text="$t('views.transactions.more')"
                    />
                </tbody>

                <tbody v-else>
                    <tr>
                        <td v-text="$t(`views.transactions.empty`)" />
                        <td />
                    </tr>
                </tbody>
            </table>
        </grid>

        <!--  -->
        <grid
            :title="$t(`views.limit.title`)"
            :helper="$t(`views.limit.helper`)"
        >
            <div class="grid__i limit">
                <p class="text--muted" v-text="$t('views.limit.subtitle')" />

                <progressBar :current="data.wallet.balance" :max="13000" />
            </div>
        </grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    methods: {
        // ...mapActions('Data', ['detach']),
        // async detachData() {
        //     await this.detach()
        // },
        formatDate(date) {
            let d = date
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('.')

            let t = date.slice(11, -5)

            return d + ' ' + t
        },
    },

    computed: {
        ...mapGetters({
            data: 'Data/responseData',
            transactions: 'Data/transactionsData',
            pin: 'Data/pinData',
        }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
