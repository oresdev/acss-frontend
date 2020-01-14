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

    <section v-else class="heading">
        <!--  -->
        <grid>
            <div class="grid__i">
                <h2 v-text="$t('success.session.title')" />
                <p v-text="$t('success.session.message')" />
            </div>
        </grid>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {},
        }
    },

    methods: {
        ...mapActions('Session', ['sessionCreate']),
        async sendRequest() {
            await this.sessionCreate(this.form)
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
