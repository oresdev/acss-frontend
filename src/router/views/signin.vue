<template>
   <section class="signin">
      <h2>
         {{ $t('signin.title') }}
      </h2>

      <article>
         <p>
            {{ $t('signin.description') }}
         </p>
      </article>

      <form class="signin-form" v-on:submit.prevent="signin">
         <label class="signin-form__label" for="email">
            <input
               class="signin-form__input"
               type="email"
               v-model="email"
               :placeholder="[[$t('signin.form.email')]]"
               required
            />
         </label>

         <label class="signin-form__label" for="password">
            <input
               class="signin-form__input"
               type="password"
               v-model="password"
               :placeholder="[[$t('signin.form.password')]]"
               required
            />
         </label>

         <button class="signin-form__button" type="submit">
            {{ $t('signin.form.submit') }}
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
      signin: function() {
         let email = this.email
         let password = this.password
         this.$store
            .dispatch('signin', { email, password })
            .then(() => this.$router.push('/account'))
         // .catch(err => console.log(err))
      },
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
