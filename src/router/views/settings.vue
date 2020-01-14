<template>
    <div :class="[{ shake: error }, '']">
        <heading />

        <!--  -->
        <form v-on:submit.prevent="sendRequest">
            <form-group :column="2" :title="$t(`views.settings.information`)">
                <form-input
                    :name="`email`"
                    :type="`text`"
                    :data="responseData.user.email"
                    :placeholder="``"
                    v-model="form.email"
                />

                <form-input
                    :name="`password`"
                    :type="`password`"
                    :data="``"
                    v-model="form.password"
                />
            </form-group>

            <form-group :column="2" :title="$t(`views.settings.contacts`)">
                <form-input
                    :name="`phone_country_code`"
                    :type="`text`"
                    :data="responseData.user.phone_country_code"
                    :placeholder="``"
                    v-model="form.phone_country_code"
                />

                <form-input
                    :name="`phone`"
                    :type="`text`"
                    :data="responseData.user.phone"
                    :placeholder="``"
                    v-model="form.phone"
                />
            </form-group>

            <p
                :class="[{ 'text--error': error }]"
                v-if="error"
                v-text="$t('error.' + error + '')"
            ></p>

            <button
                class="button button-default"
                type="submit"
                v-text="$t('views.settings.submit')"
            />
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                phone: '',
                phone_country_code: '',
            },
        }
    },

    methods: {
        ...mapActions('Data', ['settings']),
        async sendRequest() {
            await this.settings({ user: this.form })
        },
    },

    computed: {
        ...mapGetters('Data', ['responseData', 'responseError']),
        error: self => (self.responseError ? self.responseError : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
