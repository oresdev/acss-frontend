<template>
   <div id="app">
      <header>
         <navigationHeader />
      </header>

      <main>
         <router-view />
      </main>

      <footer>
         <navigationFooter />
      </footer>
   </div>
</template>

<script>
import navigationHeader from '@/components/navigationHeader.vue'
import navigationFooter from '@/components/navigationFooter.vue'
export default {
   data() {
      return {}
   },
   components: { navigationHeader, navigationFooter },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/assets/sass/main';
</style>
