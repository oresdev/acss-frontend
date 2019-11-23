<template>
   <ul class="process">
      <li class="process__item" :style="processBar">
         {{ balance + '$' }}
      </li>
   </ul>
</template>

<script>
export default {
   name: '',
   data() {
      return {}
   },
   props: {
      balance: [String, Number],
   },
   computed: {
      processBar: function() {
         var width = this.balance

         if (width > 11000) {
            return {
               background: 'hsla(0, 85%, 46%, 0.361)',
               color: 'hsl(0, 0%, 93%)',
               width: width / 130 + '%',
            }
         }
         return {
            width: width / 130 + '%',
         }
      },
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
