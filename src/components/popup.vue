<template>
    <div class="backdrop">
        <div class="popup">
            <svg @click="$emit('close')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357" width="16" height="16">
                <defs />
                <path d="M357 35.7L321.3 0 178.5 142.8 35.7 0 0 35.7l142.8 142.8L0 321.3 35.7 357l142.8-142.8L321.3 357l35.7-35.7-142.8-142.8z" />
            </svg>

            <figure v-if="qr_data">
                <qrcode v-bind:value="qr_data" :options="{ width: 200 }"></qrcode>
            </figure>

            <div class="popup__body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        qr_data: {
            type: String,
            default: '',
        },
    },
    methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
