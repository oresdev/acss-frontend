<template>
    <section class="profile">
        <h2>{{ $t('profile.title') }}</h2>

        <form class="form" enctype="multipart/form-data" v-on:submit.prevent="profile">
            <div class="form__row">
                <h4>{{ $t('profile.personalinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="firstname">
                        {{ $t('profile.information.form.name') }}
                        <input type="text" v-model="firstname" required />
                    </label>

                    <label for="lastname">
                        {{ $t('profile.information.form.surname') }}
                        <input type="text" v-model="lastname" required />
                    </label>

                    <label for="middlename">
                        {{ $t('profile.information.form.midlname') }}
                        <input type="text" v-model="middlename" />
                    </label>

                    <label for="dateofbirth">
                        {{ $t('profile.information.form.date-of-birth') }}
                        <input type="text" v-mask="'##.##.####'" v-model="dateofbirth" required />
                    </label>

                    <label for="firstname_local">
                        {{ $t('profile.information.form.localname') }}
                        <input type="text" v-model="firstname_local" required />
                    </label>

                    <label for="lastname_local">
                        {{ $t('profile.information.form.locallastname') }}
                        <input type="text" v-model="lastname_local" required />
                    </label>
                </div>

                <div class="form__col form__col--3">
                    <label for="gender" class="form-select">
                        {{ $t('profile.information.form.gender') }}
                        <select v-model="gender" required>
                            <option value="M">{{ $t('profile.information.gender.male') }}</option>
                            <option value="F">{{ $t('profile.information.gender.female') }}</option>
                        </select>
                    </label>

                    <label for="nationality" class="form-select">
                        {{ $t('profile.information.form.nationality') }}
                        <select v-model="nationality" required>
                            <option v-for="(value, name) in objects.iso" :key="name" v-bind:value="value.alpha3">{{ value.country }}</option>
                        </select>
                    </label>

                    <label for="occupation_code" class="form-select">
                        {{ $t('profile.information.form.occupation') }}
                        <select v-model="occupation_code" required>
                            <option v-for="(item, i) in $t('profile.information.occupation')" :key="`item${i}`" v-bind:value="item.value">{{ item.title }}</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.contactinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="cell_number_country_code">
                        {{ $t('profile.information.form.cell-code') }}
                        <input type="text" v-mask="'##'" v-model="cell_number_country_code" required />
                    </label>

                    <label for="cell_number">
                        {{ $t('profile.information.form.cell-number') }}
                        <input type="text" v-mask="'##############'" v-model="cell_number" required />
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.addressinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="address">
                        {{ $t('profile.information.form.address') }}
                        <input type="text" v-model="address" required />
                    </label>

                    <label for="city">
                        {{ $t('profile.information.form.city') }}
                        <input type="text" v-model="city" required />
                    </label>

                    <label for="postalcode">
                        {{ $t('profile.information.form.postcode') }}
                        <input type="text" v-mask="'##############'" v-model="postalcode" required />
                    </label>

                    <label class="form-select" for="country">
                        {{ $t('profile.information.form.country') }}
                        <select v-model="country" required>
                            <option v-for="(value, name) in objects.iso" :key="name" v-bind:value="value.alpha3">{{ value.country }}</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.idinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="doc_pid_number">
                        {{ $t('profile.passport.form.pid-number') }}
                        <input type="text" v-mask="'##################'" v-model="doc_pid_number" required />
                    </label>

                    <label for="doc_pid_image">
                        {{ $t('profile.passport.form.id-front') }}
                        <input type="file" name="doc_pid_image" id="doc_pid_image" ref="doc_pid_image" required />
                    </label>
                </div>
            </div>

            <div class="form__col form__col--3">
                <div class="form__row">
                    <h4>{{ $t('profile.passport.form.id-back') }}</h4>
                    <div class="form__col">
                        <label for="doc_pidback_image">
                            <input type="file" name="doc_pidback_image" id="doc_pidback_image" ref="doc_pidback_image" required />
                        </label>
                    </div>
                </div>

                <div class="form__row">
                    <h4>
                        {{ $t('profile.passport.form.id-selfie') }}
                    </h4>
                    <div class="form__col">
                        <label for="doc_poa_image">
                            <input type="file" name="doc_poa_image" id="doc_poa_image" ref="doc_poa_image" required />
                        </label>
                    </div>
                </div>

                <div class="form__row">
                    <h4>{{ $t('profile.passport.form.signature') }}</h4>
                    <div class="form__col">
                        <label for="doc_sign_image">
                            <input type="file" name="doc_sign_image" id="doc_sign_image" ref="doc_sign_image" value required />
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit">
                {{ $t('profile.passport.form.submit') }}
            </button>
        </form>
    </section>
</template>

<script>
const iso = require('@/iso3166')
export default {
    data() {
        return {
            listIso: process.env.iso,
            objects: {
                iso: iso,
            },
            firstname: '',
            lastname: '',
            middlename: '',
            firstname_local: '',
            lastname_local: '',
            dateofbirth: '',
            nationality: '',
            address: '',
            city: '',
            postalcode: '',
            country: '',
            gender: '',
            cell_number: '',
            cell_number_country_code: '',
            occupation_code: '',
            doc_pid_number: '',
            doc_poa_number: '',
            doc_pid_image: '',
            doc_poa_image: '',
            doc_pidback_image: '',
            doc_sign_image: '',
        }
    },
    computed: {
        prof() {
            return this.$store.state.profile
        },
    },
    async created() {
        const result = await this.$store.dispatch('getProf')
    },
    methods: {
        profile: function() {
            let data = new FormData()

            data.append('firstname', this.firstname)
            data.append('lastname', this.lastname)
            data.append('middlename', this.middlename)
            data.append('firstname_local', this.firstname_local)
            data.append('lastname_local', this.lastname_local)
            data.append('dateofbirth', this.dateofbirth)
            data.append('nationality', this.nationality)
            data.append('address', this.address)
            data.append('city', this.city)
            data.append('postalcode', this.postalcode)
            data.append('country', this.country)
            data.append('gender', this.gender)
            data.append('cell_number', this.cell_number)
            data.append('cell_number_country_code', this.cell_number_country_code)
            data.append('occupation_code', this.occupation_code)
            data.append('doc_pid_number', this.doc_pid_number)
            data.append('doc_poa_number', this.doc_poa_number)

            data.append('doc_pid_image', doc_pid_image.files[0])
            data.append('doc_poa_image', doc_poa_image.files[0])
            data.append('doc_pidback_image', doc_pidback_image.files[0])
            data.append('doc_sign_image', doc_sign_image.files[0])

            const res = this.$store.dispatch('profile', data)
            if (res) {
                this.$router.push('/account')
            }
            // .catch(err => console.log(err))
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
