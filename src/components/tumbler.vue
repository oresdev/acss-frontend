<template>
    <div class="tumbler">
        <span class="tumbler__label" v-if="label" v-text="label" />

        <label :class="['tumbler__button', { 'turn-on': turned }]">
            <input type="checkbox" />

            <span :class="[turned ? 'on' : 'off']" v-on:click="turn()"></span>
        </label>

        <div v-if="modal">
            <!-- use the modal component, pass in the prop -->
            <modal v-if="turned" v-on:close="turn()">
                <p :class="[pin ? 'modal-pin' : '']" v-text="value" />

                <qrcode
                    v-if="address"
                    :value="address"
                    :options="{ width: 200 }"
                />

                <figure v-if="src">
                    <img :src="src" />
                </figure>

                <p v-text="address" />
            </modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            turned: false,
        }
    },

    props: {
        label: {
            type: [String, Number],
            default: null,
        },
        value: {
            type: [String, Number],
            default: null,
        },
        address: {
            type: [String, Number],
            default: null,
        },
        modal: {
            type: Boolean,
            default: false,
        },
        pin: {
            type: Boolean,
            default: false,
        },
        src: {
            type: [String, Object, File],
            default: null,
        },
    },

    methods: {
        turn() {
            this.turned = !this.turned
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
