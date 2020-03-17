<template>
    <div v-if="!success">
        <heading />

        <!--  -->
        <grid
            v-if="dataStatus != false && !loader"
            :title="$t(`views.kyc.status`)"
        >
            <ul>
                <li
                    v-for="item in dataStatus"
                    :key="item.i"
                    :class="[{ 'text--error': item.status_code == 12 }]"
                    v-text="formatMessage(item.message)"
                ></li>
            </ul>
        </grid>

        <!--  -->
        <form v-if="!loader" id="form" v-on:submit.prevent="setData">
            <form-group
                :column="2"
                :title="$t(`views.kyc.information`)"
                :helper="$t(`views.kyc.helper.information`)"
            >
                <form-input
                    class="smooth"
                    :name="`firstname`"
                    :type="`text`"
                    :data="``"
                    v-model="data.firstname"
                />
                <!-- pinyin data removed -->
                <form-input
                    :name="`firstname_local`"
                    :type="`text`"
                    :data="``"
                    :placeholder="`姓名名`"
                    v-model="data.firstname_local"
                />

                <form-input
                    class="smooth"
                    :name="`lastname`"
                    :type="`text`"
                    :data="``"
                    v-model="data.lastname"
                />

                <form-input
                    class="smooth"
                    :name="`dateofbirth`"
                    :type="`text`"
                    :data="``"
                    date
                    v-model="data.dateofbirth"
                    v-mask="'##.##.####'"
                />
            </form-group>

            <!--  -->
            <form-group :column="2" :title="$t(`views.kyc.secondary`)">
                <form-input
                    :name="`gender`"
                    :type="`select`"
                    :data="$t('form.gender.array')"
                    v-model="data.gender"
                />

                <form-input
                    :name="`nationality`"
                    :type="`select`"
                    :data="$t('form.nationality.array')"
                    v-model="data.nationality"
                />

                <form-input
                    :name="`occupation_code`"
                    :type="`select`"
                    :data="$t('form.occupation_code.array')"
                    v-model="data.occupation_code"
                />
            </form-group>

            <!--  -->
            <form-group
                :column="2"
                :title="$t(`views.kyc.contacts`)"
                :helper="$t(`views.kyc.helper.contacts`)"
            >
                <form-input
                    :name="`cell_number_country_code`"
                    :type="`text`"
                    :data="``"
                    v-model="data.cell_number_country_code"
                    v-mask="'###'"
                />

                <form-input
                    class="smooth"
                    :name="`cell_number`"
                    :type="`text`"
                    :data="``"
                    v-model="data.cell_number"
                    v-mask="'###########'"
                />
            </form-group>

            <!--  -->
            <form-group :column="2" :title="$t(`views.kyc.address`)">
                <form-input
                    :name="`country`"
                    :type="`select`"
                    :data="$t('form.country.array')"
                    v-model="data.country"
                />

                <form-input
                    :name="`city`"
                    :type="`text`"
                    :data="``"
                    v-model="data.city"
                />

                <form-input
                    :name="`address`"
                    :type="`text`"
                    :data="``"
                    v-model="data.address"
                />

                <form-input
                    :name="`postalcode`"
                    :type="`text`"
                    :data="``"
                    v-model="data.postalcode"
                    v-mask="'######'"
                />
            </form-group>

            <!--  -->
            <form-group
                :column="2"
                :title="$t(`views.kyc.card`)"
                :helper="$t(`views.kyc.helper.card`)"
            >
                <form-input
                    class="smooth"
                    :name="`doc_pid_number`"
                    :type="`text`"
                    :data="``"
                    v-model="data.doc_pid_number"
                    v-mask="'#################X'"
                />

                <form-input
                    :name="`doc_pid_image`"
                    :type="`file`"
                    :data="data.doc_pid_image"
                    v-model="doc_pid_image"
                />
            </form-group>

            <!--  -->
            <form-group
                :column="2"
                :title="$t(`views.kyc.documents`)"
                :helper="$t(`views.kyc.helper.documents`)"
            >
                <form-input
                    :name="`doc_poa_image`"
                    :type="`file`"
                    :data="data.doc_poa_image"
                    v-model="doc_poa_image"
                />

                <form-input
                    :name="`doc_pidback_image`"
                    :type="`file`"
                    :data="data.doc_pidback_image"
                    v-model="doc_pidback_image"
                />
            </form-group>

            <!--  -->
            <form-group
                :column="2"
                :title="$t(`views.kyc.sign`)"
                :helper="$t(`views.kyc.helper.sign`)"
            >
                <form-input
                    :name="`doc_sign_image`"
                    :type="`file`"
                    :data="data.doc_sign_image"
                    v-model="doc_sign_image"
                />
            </form-group>
            {{ this.doc_sign_image }}

            <button
                class="button button-default"
                type="submit"
                v-text="$t('views.kyc.submit')"
            />
        </form>
    </div>

    <div v-else class="heading">
        <!--  -->
        <grid>
            <div class="grid__i">
                <h2 v-text="$t('success.kyc.title')" />
                <p v-html="$t('success.kyc.message')" />
            </div>
        </grid>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            doc_pid_image: null,
            doc_pidback_image: null,
            doc_poa_image: null,
            doc_sign_image: null,
        }
    },

    methods: {
        ...mapActions('Profile', ['profile', 'status', 'updateProfile']),
        async setData() {
            let data = new FormData(document.getElementById('form'))

            data.append('middlename', null)
            data.append('lastname_local', null)
            data.append('country', this.data.country)
            data.append('nationality', this.data.nationality)
            data.append('occupation_code', this.data.occupation_code)
            data.append('gender', this.data.gender)

            this.doc_pid_image
                ? data.append('doc_pid_image', this.doc_pid_image)
                : false
            this.doc_poa_image
                ? data.append('doc_poa_image', this.doc_poa_image)
                : false
            this.doc_pidback_image
                ? data.append('doc_pidback_image', this.doc_pidback_image)
                : false
            this.doc_sign_image
                ? data.append('doc_sign_image', this.doc_sign_image)
                : false

            await this.updateProfile(data)
            // console.log(FormData)
        },
        async reloadData() {
            await this.status()
        },
        formatMessage: message =>
            message
                .slice(8)
                .split('<=>')[0]
                .replace(/(\w+)/g, ' $1 '),
    },

    computed: {
        ...mapState({
            loader: 'loader',
        }),
        ...mapGetters({
            data: 'Profile/responseData',
            dataStatus: 'Profile/responseStatus',
            success: 'Profile/responseSuccess',
        }),
    },

    async mounted() {
        await this.reloadData()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
