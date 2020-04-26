<template>
    <div :class="[{ shake: error }, '']" v-if="!responseStatus">
        <heading />

        <!--  -->
        <grid :column="2" push>
            <form class="grid__i transfer" submit.prevent>
                <p class="text--muted" v-text="$t(`views.transfer.details`)" />
                <fieldset>
                    <grid :column="2">
                        <label :for="form.recipient_card_number">
                            {{ $t(`views.transfer.cardnumber`) }}
                            <input
                                type="text"
                                :maxlength="16"
                                v-mask="'################'"
                                v-model="form.recipient_card_number"
                                required
                            />
                        </label>

                        <label :for="form.amount">
                            {{ $t(`views.transfer.amount`) }}
                            <input
                                type="text"
                                :maxlength="16"
                                v-mask="'################'"
                                v-model="form.amount"
                                required
                            />
                        </label>
                    </grid>
                </fieldset>

                <p
                    :class="[{ 'text--error': error }]"
                    v-if="error"
                    v-text="$t('error.' + error + '')"
                ></p>
            </form>

            <visa
                :number="form.recipient_card_number"
                :holder="``"
                :expires="``"
            />
        </grid>

        <button
            class="button button-default"
            type="submit"
            :disabled="error || loader"
            v-on:click="sendRequest"
            v-text="$t('views.transfer.submit')"
        />
    </div>

    <div v-else>
        <!--  -->
        <grid>
            <div class="grid__i">
                <h2 v-text="$t('views.transfer.success')" />
                <p v-html="$t('views.transfer.message')" />
            </div>
        </grid>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                recipient_card_number: '',
                amount: '',
            },
        }
    },

    methods: {
        ...mapActions('Data', ['transfer']),
        async sendRequest() {
            await this.transfer(this.form)
        },
    },

    computed: {
        ...mapState({
            loader: 'loader',
        }),
        ...mapGetters('Data', ['responseError', 'responseStatus']),
        error: self => (self.responseError ? self.responseError : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
