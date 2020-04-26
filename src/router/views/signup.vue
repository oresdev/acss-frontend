<template>
    <section :class="[{ shake: error }, 'signup']" v-if="!responseStatus">
        <heading />

        <form submit.prevent>
            <fieldset class="grid col">
                <input
                    type="email"
                    v-model="form.email"
                    :placeholder="$t('form.email')"
                    required
                />
                <!--  -->
                <input
                    type="password"
                    v-model="form.password"
                    :placeholder="$t('form.password')"
                    required
                />
            </fieldset>

            <p
                :class="[{ 'text--error': error }]"
                v-if="error"
                v-text="$t('error.' + error + '')"
            ></p>

            <router-link :to="'/terms'" v-text="$t('views.signup.terms')" />
        </form>

        <button
            class="button button-default"
            type="submit"
            :disabled="error"
            v-on:click="sendRequest"
            v-text="$t('views.signup.submit')"
        />
    </section>

    <section v-else :class="[{ shake: error }, 'signup']">
        <section class="heading">
            <h1 v-html="$t('views.confirmcode.title')" />
            <p class="text--muted" v-html="$t('views.confirmcode.subtitle')" />
        </section>

        <form submit.prevent>
            <fieldset class="grid col">
                <input
                    type="hidden"
                    v-model="form.email"
                    :placeholder="$t('form.email')"
                    required
                />
                <!--  -->
                <input
                    type="password"
                    v-model="form.code"
                    :placeholder="$t('form.confirmcode')"
                    required
                />
            </fieldset>

            <p
                :class="[{ 'text--error': error }]"
                v-if="error"
                v-text="$t('error.' + error + '')"
            ></p>
        </form>

        <button
            class="button button-default"
            type="submit"
            :disabled="error"
            v-on:click="sendCode"
            v-text="$t('views.signup.submit')"
        />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: { licence_key: 'cyprus007' },
        }
    },

    methods: {
        ...mapActions('Session', [
            'sessionCreate',
            'generateCode',
            'sessionConfirm',
        ]),
        async sendRequest() {
            await this.sessionCreate(this.form)
            await this.generateCode({ email: this.form.email })
        },
        async sendCode() {
            await this.sessionConfirm({
                email: this.form.email,
                code: this.form.code,
            })
        },
    },

    computed: {
        ...mapGetters('Session', ['responseError', 'responseStatus']),
        error: self => (self.responseError ? self.responseError : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
