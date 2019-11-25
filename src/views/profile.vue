<template>
   <section class="profile">
      <h2>{{ $t('profile.title') }}</h2>

      <ul class="tabs">
         <li v-bind:class="[activetab === 1 ? 'active' : '']">
            {{ $t('profile.terms.title') }}
         </li>

         <li v-bind:class="[activetab === 2 ? 'active' : '']">
            {{ $t('profile.information.title') }}
         </li>

         <li v-bind:class="[activetab === 3 ? 'active' : '']">
            {{ $t('profile.passport.title') }}
         </li>
      </ul>

      <div v-show="activetab === 1">
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

         <form class="profile-form" v-on:submit.prevent>
            <label class="profile-form__label" for=""
               >{{ $t('profile.terms.confirm') }}
               <input
                  class="profile-form__checkbox"
                  type="checkbox"
                  name=""
                  v-model="isChecked"
               />
            </label>

            <button
               class="profile-form__button"
               type="text"
               v-on:click="activetab = 2"
               :disabled="!isChecked"
            >
               {{ $t('profile.terms.form.submit') }}
            </button>
         </form>
      </div>

      <div v-show="activetab === 2">
         <article>
            <p>{{ $t('profile.information.description') }}</p>
         </article>

         <form
            enctype="multipart/form-data"
            class="profile-form"
            v-on:submit.prevent="profile"
         >
            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="firstname">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-model="firstname"
                        :placeholder="[[$t('profile.information.form.name')]]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="lastname">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-model="lastname"
                        :placeholder="[
                           [$t('profile.information.form.surname')],
                        ]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="middlename">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-model="middlename"
                        :placeholder="[
                           [$t('profile.information.form.midlname')],
                        ]"
                     />
                  </label>
               </div>

               <div class="profile-form-items__item">
                  <p>
                     {{ $t('profile.information.form.details') }}
                  </p>
               </div>
            </div>

            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <label class="profile-form__label form-select" for="gender">
                     <select id="" v-model="gender" required>
                        <option
                           value=""
                           disabled="disabled"
                           selected="selected"
                        >
                           {{ $t('profile.information.form.gender') }}
                        </option>
                        <option value="M">{{
                           $t('profile.information.gender.male')
                        }}</option>
                        <option value="F">{{
                           $t('profile.information.gender.female')
                        }}</option>
                     </select>
                  </label>

                  <label
                     class="profile-form__label form-select"
                     for="occupation_code"
                  >
                     <select id="" v-model="occupation_code" required>
                        <option
                           value=""
                           disabled="disabled"
                           selected="selected"
                        >
                           {{ $t('profile.information.form.occupation') }}
                        </option>
                        <option
                           v-for="(item, i) in $t(
                              'profile.information.occupation'
                           )"
                           :key="`item${i}`"
                           v-bind:value="item.value"
                           >{{ item.title }}</option
                        >
                     </select>
                  </label>
               </div>

               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="dateofbirth">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##.##.####'"
                        v-model="dateofbirth"
                        :placeholder="[
                           [$t('profile.information.form.date-of-birth')],
                        ]"
                        required
                     />
                  </label>

                  <label
                     class="profile-form__label form-select"
                     for="nationality"
                  >
                     <select id="" v-model="nationality" required>
                        <option
                           value=""
                           disabled="disabled"
                           selected="selected"
                        >
                           {{ $t('profile.information.form.nationality') }}
                        </option>
                        <option
                           v-for="(value, name) in objects.iso"
                           :key="name"
                           v-bind:value="value.alpha2"
                           >{{ value.country }}</option
                        >
                     </select>
                  </label>
               </div>
            </div>

            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <label
                     class="profile-form__label"
                     for="cell_number_country_code"
                  >
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##'"
                        v-model="cell_number_country_code"
                        :placeholder="[
                           [$t('profile.information.form.cell-code')],
                        ]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="cell_number">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##############'"
                        v-model="cell_number"
                        :placeholder="[
                           [$t('profile.information.form.cell-number')],
                        ]"
                        required
                     />
                  </label>

                  <label class="profile-form__label form-select" for="country">
                     <select id="" v-model="country" required>
                        <option
                           value=""
                           disabled="disabled"
                           selected="selected"
                        >
                           {{ $t('profile.information.form.country') }}
                        </option>
                        <option
                           v-for="(value, name) in objects.iso"
                           :key="name"
                           v-bind:value="value.alpha2"
                           >{{ value.country }}</option
                        >
                     </select>
                  </label>
               </div>
               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="city">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-model="city"
                        :placeholder="[[$t('profile.information.form.city')]]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="postalcode">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##############'"
                        v-model="postalcode"
                        :placeholder="[
                           [$t('profile.information.form.postcode')],
                        ]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="address">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-model="address"
                        :placeholder="[
                           [$t('profile.information.form.address')],
                        ]"
                        required
                     />
                  </label>
               </div>
            </div>

            <div class="form__group">
               <button
                  class="profile-form__button"
                  type="text"
                  v-on:click.stop.prevent="activetab = 3"
               >
                  {{ $t('profile.information.form.submit') }}
               </button>
            </div>
         </form>
      </div>

      <div v-show="activetab === 3">
         <article>
            <p>{{ $t('profile.passport.description') }}</p>
         </article>

         <form
            enctype="multipart/form-data"
            class="profile-form"
            v-on:submit.prevent="profile"
         >
            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="doc_pid_number">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##################'"
                        v-model="doc_pid_number"
                        :placeholder="[
                           [$t('profile.passport.form.pid-number')],
                        ]"
                        required
                     />
                  </label>

                  <label class="profile-form__label" for="doc_pid_number">
                     <input
                        class="profile-form__input"
                        type="text"
                        v-mask="'##################'"
                        v-model="doc_poa_number"
                        :placeholder="[
                           [$t('profile.passport.form.poa-number')],
                        ]"
                     />
                  </label>
               </div>

               <div class="profile-form-items__item">
                  <p>
                     {{ $t('profile.passport.form.details') }}
                  </p>
               </div>
            </div>

            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <figure>
                     <img src="@/assets/prc_id_card_front.png" alt />
                  </figure>

                  <label class="profile-form__label" for="doc_pid_image">
                     {{ $t('profile.passport.form.id-back') }}
                     <input
                        class="profile-form__file"
                        type="file"
                        name="doc_pid_image"
                        id="doc_pid_image"
                        ref="doc_pid_image"
                        required
                     />
                  </label>
               </div>

               <div class="profile-form-items__item">
                  <figure>
                     <img src="@/assets/prc_id_card_back.png" alt />
                  </figure>

                  <label class="profile-form__label" for="doc_pidback_image">
                     {{ $t('profile.passport.form.id-front') }}
                     <input
                        class="profile-form__file"
                        type="file"
                        name="doc_pidback_image"
                        id="doc_pidback_image"
                        ref="doc_pidback_image"
                        required
                     />
                  </label>
               </div>
            </div>

            <div class="profile-form-items">
               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="doc_poa_image">
                     {{ $t('profile.passport.form.id-selfie') }}
                     <input
                        class="profile-form__file"
                        type="file"
                        name="doc_poa_image"
                        id="doc_poa_image"
                        ref="doc_poa_image"
                        required
                     />
                  </label>
               </div>

               <div class="profile-form-items__item">
                  <label class="profile-form__label" for="doc_sign_image">
                     {{ $t('profile.passport.form.signature') }}
                     <input
                        class="profile-form__file"
                        type="file"
                        name="doc_sign_image"
                        id="doc_sign_image"
                        ref="doc_sign_image"
                        value
                        required
                     />
                  </label>
               </div>
            </div>

            <button class="profile-form__button" type="submit">
               {{ $t('profile.passport.form.submit') }}
            </button>
         </form>
      </div>
   </section>
</template>

<script>
const iso = require('../iso3166')
export default {
   data() {
      return {
         listIso: process.env.iso,
         activetab: 1,
         isChecked: false,
         objects: {
            iso: iso,
         },
         firstname: '',
         lastname: '',
         middlename: '',
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
   methods: {
      profile: function() {
         let data = new FormData()

         data.append('firstname', this.firstname)
         data.append('lastname', this.lastname)
         data.append('middlename', this.middlename)
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

         this.$store.dispatch('profile', data)
         // .then(() => this.$router.push('/account'))
         // .catch(err => console.log(err))
      },
   },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
