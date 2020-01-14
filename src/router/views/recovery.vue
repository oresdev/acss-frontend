<template>
    <section class="recovery" v-if="!responseStatus">
        <heading />

        <form submit.prevent>
            <fieldset class="grid col">
                <input
                    type="email"
                    v-model="form.email"
                    :placeholder="$t('form.email')"
                    required
                />
            </fieldset>

            <router-link :to="'/terms'" v-text="$t('views.recovery.terms')" />
        </form>

        <button
            class="button button-default"
            type="submit"
            v-on:click="sendRequest"
            v-text="$t('views.recovery.submit')"
        />
    </section>

    <section v-else class="heading">
        <!--  -->
        <grid>
            <div class="grid__i">
                <h2 v-text="$t('success.recovery.title')" />
                <p v-html="$t('success.recovery.message')" />
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
        ...mapActions('Session', ['sessionRecovery']),
        async sendRequest() {
            await this.sessionRecovery(this.form)
        },
    },

    computed: {
        ...mapGetters('Session', ['responseStatus']),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
