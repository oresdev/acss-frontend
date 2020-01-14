<template>
    <transition name="modal">
        <div class="modal__mask" v-on:click="$emit('close')">
            <div class="modal__container">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
