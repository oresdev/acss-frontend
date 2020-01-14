<template>
    <div :class="[{ shake: error }, '']">
        <heading />

        <!--  -->
        <grid
            :column="2"
            :title="$t(`views.create.welcome`)"
            :helper="$t(`views.create.helper`)"
            push
        >
            <form class="grid__i create" submit.prevent>
                <p class="text--muted" v-text="$t(`views.create.details`)" />
                <fieldset>
                    <label :for="form.number">
                        {{ $t(`views.create.cardnumber`) }}
                        <input
                            type="password"
                            :maxlength="16"
                            v-mask="'################'"
                            v-model="form.number"
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

            <visa :number="form.number" :holder="``" :expires="``" />
        </grid>

        <button
            class="button button-default"
            type="submit"
            :disabled="error"
            v-on:click="sendRequest"
            v-text="$t('views.create.submit')"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                number: '',
            },
        }
    },

    methods: {
        ...mapActions('Data', ['attach']),
        async sendRequest() {
            await this.attach(this.form)
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
