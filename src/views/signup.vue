<template>
   <section class="signup">
      <h2>
         {{ $t('signup.title') }}
      </h2>

      <article>
         <p>
            {{ $t('signup.description') }}
         </p>
      </article>

      <form class="signup-form" v-on:submit.prevent="signup">
         <label class="signup-form__label" for="email">
            <input
               class="signup-form__input"
               type="email"
               v-model="email"
               :placeholder="[[$t('signup.form.email')]]"
               required
            />
         </label>

         <label class="signup-form__label" for="password">
            <input
               class="signup-form__input"
               type="password"
               v-model="password"
               :placeholder="[[$t('signup.form.password')]]"
               required
            />
         </label>

         <label class="signup-form__label" for="password">
            <input
               class="signup-form__input"
               type="password"
               v-model="password_confirmation"
               :placeholder="[[$t('signup.form.password-confirm')]]"
               required
            />
         </label>

         <button class="signup-form__button" type="submit">
            {{ $t('signup.form.submit') }}
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
         password_confirmation: '',
         is_admin: null,
      }
   },
   methods: {
      signup: function() {
         let data = {
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            is_admin: this.is_admin,
         }
         this.$store.dispatch('signup', data).then(() => this.$router.push('/'))
         // .catch(err => console.log(err))
      },
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
