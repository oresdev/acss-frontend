<template>
    <div :class="[{ shake: error }, '']">
        <heading />

        <!--  -->
        <grid :column="2" push>
            <form class="grid__i transfer" submit.prevent>
                <p class="text--muted" v-text="$t(`views.transfer.details`)" />
                <fieldset>
                    <label :for="form.destination_number">
                        {{ $t(`views.transfer.cardnumber`) }}
                        <input
                            type="text"
                            :maxlength="16"
                            v-mask="'################'"
                            v-model="form.destination_number"
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
                </fieldset>

                <p
                    :class="[{ 'text--error': error }]"
                    v-if="error"
                    v-text="$t('error.' + error + '')"
                ></p>
            </form>

            <visa
                :number="form.destination_number"
                :holder="``"
                :expires="``"
            />
        </grid>

        <button
            class="button button-default"
            type="submit"
            :disabled="error"
            v-on:click="sendRequest"
            v-text="$t('views.transfer.submit')"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                destination_number: '',
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
        ...mapGetters('Data', ['responseError']),
        error: self => (self.responseError ? self.responseError : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
