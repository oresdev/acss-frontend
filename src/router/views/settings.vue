<template>
   <section class="settings">
      <h2>
         {{ $t('settings.title') }}
      </h2>

      <article>
         <p>
            {{ $t('settings.description') }}
         </p>
      </article>

      <form class="settings-form" v-on:submit.prevent="settings">
         <label class="settings-form__label" for="email">
            <input
               class="settings-form__input"
               type="email"
               v-model="email"
               :placeholder="[[$t('settings.form.email')]]"
               required
            />
         </label>

         <label class="settings-form__label" for="password">
            <input
               class="settings-form__input"
               type="password"
               v-model="password"
               :placeholder="[[$t('settings.form.password')]]"
               required
            />
         </label>

         <button class="settings-form__button" type="submit">
            {{ $t('settings.form.submit') }}
         </button>
      </form>
   </section>
</template>

<script>
export default {
   data() {
      return {
         email: '',
         password: '',
      }
   },
   methods: {
      settings: function() {
         let email = this.email
         let password = this.password

         this.$store.dispatch('settings', { user: { email, password } })

         // .catch(err => console.log(err))
      },
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
