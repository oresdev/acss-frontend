<template>
    <div :class="[{ tour: tour }, 'container']">
        <h4 class="container__title text--muted" v-if="title" v-text="title" />

        <div class="group" v-if="helper">
            <figure>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    width="22"
                    class="helper"
                    viewBox="0 0 24 24"
                    v-on:click="active"
                >
                    <defs />
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                </svg>
            </figure>
        </div>

        <div :class="'grid grid__i ' + (column ? 'col__' + column : '')">
            <slot> </slot>
        </div>

        <div v-if="tour" class="tour__helper">
            <figure>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                >
                    <defs />
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                </svg>
            </figure>

            <p v-html="helper" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },
        column: {
            type: Number,
            default: null,
        },
        helper: {
            type: [String, Number],
            default: null,
        },
    },

    data() {
        return {
            tour: false,
        }
    },

    methods: {
        active: function() {
            document.body.classList.toggle('blured')
            this.tour = !this.tour
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
