<template>
    <figure>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="21"
            stroke-width="2"
            class="update"
            v-on:click="
                reloadData(), $event.target.classList.toggle('update--rotate')
            "
            viewBox="0 0 24 24"
        >
            <defs />
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path
                d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
            />
        </svg>
    </figure>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('Data', ['account']),
        async reloadData() {
            await this.account()
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
