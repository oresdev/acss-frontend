<template>
    <section :class="[{ shake: error }, 'signin']">
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

            <router-link
                :to="'/recovery'"
                v-text="$t('views.recovery.title')"
            />
        </form>

        <button
            class="button button-default"
            type="submit"
            :disabled="error"
            v-on:click="sendRequest"
            v-text="$t('views.signin.submit')"
        />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },

    methods: {
        ...mapActions('Session', ['session']),
        async sendRequest() {
            await this.session(this.form)
        },
    },

    computed: {
        ...mapGetters('Session', ['responseError']),
        error: self => (self.responseError ? self.responseError : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
