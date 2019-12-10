<template>
    <section class="profile">
        <h2>{{ $t('profile.title') }}</h2>

        <div class="status" v-if="error">
            <div class="status__i status__i--error">
                {{ error }}
            </div>
        </div>

        <div v-if="!checked">
            <h4 v-text="$t('profile.terms.title')"></h4>
            <article>
                <p>{{ $t('profile.terms.d1') }}</p>

                <ul class="profile__list">
                    <li>{{ $t('profile.terms.list.t1') }}</li>
                    <li>{{ $t('profile.terms.list.t2') }}</li>
                    <li>{{ $t('profile.terms.list.t3') }}</li>
                    <li>{{ $t('profile.terms.list.t4') }}</li>
                </ul>

                <p>{{ $t('profile.terms.d2') }}</p>
                <p>{{ $t('profile.terms.d3') }}</p>
                <p>{{ $t('profile.terms.d4') }}</p>
            </article>

            <a href="https://cards.acss.tech/kyc.pdf" download>
                <button class="profile-form__button" type="button">{{ $t('profile.terms.link') }}</button>
            </a>

            <button class="profile-form__button" type="text" @click="backToTop">
                {{ $t('profile.terms.form.submit') }}
            </button>
        </div>

        <form v-if="checked" id="form" class="form" enctype="multipart/form-data" v-on:submit.prevent="profileData">
            <div class="form__row">
                <h4>{{ $t('profile.personalinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="firstname">
                        {{ $t('profile.information.form.name') }}
                        <input type="text" id="firstname" name="firstname" v-bind:value="profile.firstname" required />
                    </label>

                    <label for="lastname">
                        {{ $t('profile.information.form.surname') }}
                        <input type="text" id="lastname" name="lastname" v-bind:value="profile.lastname" required />
                    </label>

                    <label for="middlename">
                        {{ $t('profile.information.form.midlname') }}
                        <input type="text" id="middlename" name="middlename" v-bind:value="profile.middlename" />
                    </label>

                    <label for="dateofbirth">
                        {{ $t('profile.information.form.date-of-birth') }}
                        <input type="text" id="dateofbirth" name="dateofbirth" v-mask="'##.##.####'" placeholder="DD.MM.YYYY" v-bind:value="date" required />
                    </label>

                    <label for="firstname_local">
                        {{ $t('profile.information.form.localname') }}
                        <input type="text" id="firstname_local" name="firstname_local" v-bind:value="profile.firstname_local" required />
                    </label>

                    <label for="lastname_local">
                        {{ $t('profile.information.form.locallastname') }}
                        <input type="text" id="lastname_local" name="lastname_local" v-bind:value="profile.lastname_local" required />
                    </label>
                </div>

                <div class="form__col form__col--3">
                    <label for="gender" class="form-select">
                        {{ $t('profile.information.form.gender') }}
                        <select id="gender" name="gender" required>
                            <option disabled selected></option>
                            <option v-for="option in genderOptions" :key="option.id" v-bind:value="option.value" :selected="option.value == profile.gender">{{
                                $t('profile.information.gender.' + option.text + '')
                            }}</option>
                        </select>
                    </label>

                    <label for="nationality" class="form-select">
                        {{ $t('profile.information.form.nationality') }}
                        <select id="nationality" name="nationality" required>
                            <option disabled selected></option>
                            <option v-for="value in objects.iso" :key="value.alpha3" v-bind:value="value.alpha3" :selected="value.alpha3 == profile.nationality">{{ value.country }}</option>
                            <!-- <option v-for="value in objects.iso" :key="value.id" v-bind:value="value.alpha3">{{ value.country }}</option> -->
                        </select>
                    </label>

                    <label for="occupation_code" class="form-select">
                        {{ $t('profile.information.form.occupation') }}
                        <select id="occupation_code" name="occupation_code" required>
                            <option disabled selected></option>
                            <option v-for="(item, i) in $t('profile.information.occupation')" :key="`item${i}`" v-bind:value="item.value" :selected="item.value == profile.occupation_code">{{
                                item.title
                            }}</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.contactinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="cell_number_country_code">
                        {{ $t('profile.information.form.cell-code') }}
                        <input type="text" id="cell_number_country_code" name="cell_number_country_code" v-mask="'###'" placeholder="###" v-bind:value="profile.cell_number_country_code" required />
                    </label>

                    <label for="cell_number">
                        {{ $t('profile.information.form.cell-number') }}
                        <input type="text" id="cell_number" name="cell_number" v-mask="'############'" placeholder="############" v-bind:value="profile.cell_number" required />
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.addressinfo') }}</h4>
                <div class="form__col form__col--3">
                    <label for="address">
                        {{ $t('profile.information.form.address') }}
                        <input type="text" id="address" name="address" v-bind:value="profile.address" required />
                    </label>

                    <label for="city">
                        {{ $t('profile.information.form.city') }}
                        <input type="text" id="city" name="city" v-bind:value="profile.city" required />
                    </label>

                    <label for="postalcode">
                        {{ $t('profile.information.form.postcode') }}
                        <input type="text" id="postalcode" name="postalcode" v-mask="'######'" placeholder="######" v-bind:value="profile.postalcode" required />
                    </label>

                    <label class="form-select" for="country">
                        {{ $t('profile.information.form.country') }}
                        <select id="country" name="country" required>
                            <option disabled selected></option>
                            <option v-for="(value, name) in objects.iso" :key="name" v-bind:value="value.alpha3" :selected="value.alpha3 == profile.country">{{ value.country }}</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="form__row">
                <h4>{{ $t('profile.idinfo') }}</h4>
                <div class="form__col form__col--2">
                    <label for="doc_pid_number">
                        {{ $t('profile.passport.form.pid-number') }}
                        <input type="text" id="doc_pid_number" name="doc_pid_number" v-bind:value="profile.doc_pid_number" required />
                    </label>
                    <div class="form__col" :style="{ backgroundImage: `linear-gradient(rgba(21, 26, 38, 0.7), rgb(21, 26, 38)),url('${profile.doc_pid_image}')` }">
                        <label for="doc_pid_image">
                            {{ $t('profile.passport.form.id-front') }}
                            <input type="file" name="doc_pid_image" id="doc_pid_image" ref="doc_pid_image" />
                        </label>
                    </div>
                </div>
            </div>

            <div class="form__col form__col--3">
                <div class="form__row">
                    <h4>{{ $t('profile.passport.form.id-back') }}</h4>
                    <div class="form__col" :style="{ backgroundImage: `linear-gradient(rgba(21, 26, 38, 0.7), rgb(21, 26, 38)),url('${profile.doc_pidback_image}')` }">
                        <label for="doc_pidback_image">
                            <input type="file" name="doc_pidback_image" id="doc_pidback_image" ref="doc_pidback_image" />
                        </label>
                    </div>
                </div>

                <div class="form__row">
                    <h4>
                        {{ $t('profile.passport.form.id-selfie') }}
                    </h4>
                    <div class="form__col" :style="{ backgroundImage: `linear-gradient(rgba(21, 26, 38, 0.7), rgb(21, 26, 38)),url('${profile.doc_poa_image}')` }">
                        <label for="doc_poa_image">
                            <input type="file" name="doc_poa_image" id="doc_poa_image" ref="doc_poa_image" />
                        </label>
                    </div>
                </div>

                <div class="form__row">
                    <h4>{{ $t('profile.passport.form.signature') }}</h4>
                    <div class="form__col" :style="{ backgroundImage: `linear-gradient(rgba(21, 26, 38, 0.7), rgb(21, 26, 38)),url('${profile.doc_sign_image}')` }">
                        <label for="doc_sign_image">
                            <input type="file" name="doc_sign_image" id="doc_sign_image" ref="doc_sign_image" />
                        </label>
                    </div>
                </div>
            </div>

            <button type="submit" :disabled="status != false">
                {{ $t('profile.passport.form.submit') }}
            </button>

            <transition name="fade">
                <div class="status" v-if="status != false">
                    <div class="status__i status__i--success">
                        {{ $t('success.description') }}
                    </div>
                </div>
            </transition>
        </form>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

const iso = require('@/iso3166')
export default {
    data() {
        return {
            checked: false,
            listIso: process.env.iso,
            objects: {
                iso: iso,
            },
            genderOptions: [
                { text: 'male', value: 'M' },
                { text: 'female', value: 'F' },
            ],
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
        ...mapState({
            profile: state => state.profile,
            status: state => state.status,
        }),
        ...mapGetters(['authenticationError']),
        error() {
            return this.authenticationError
        },
        date() {
            var newDate = this.profile.dateofbirth
            if (newDate) {
                return moment(newDate).format('DD.MM.YYYY')
            }
            return null
        },
    },
    methods: {
        ...mapActions(['setProfile', 'getProfile']),

        async profileData() {
            var data = new FormData(document.getElementById('form'))

            await this.setProfile(data)

            await this.getProfile()

            setTimeout(() => {
                this.$store.state.status = ''
            }, 10000)
        },
        /**
         * The function who make the magics
         * @return {void}
         */
        backToTop() {
            window.smoothscroll()
            this.checked = true
        },
    },
    async mounted() {
        // If we didn't already do it on the server we fetch the item (will first show the loading text)
        await this.getProfile()
        this.$store.state.status = ''

        window.smoothscroll = () => {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
            if (currentScroll > 0) {
                window.requestAnimationFrame(window.smoothscroll)
                window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
            }
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
