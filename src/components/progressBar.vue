<template>
    <div class="progress">
        <ul class="progress-amount">
            <li class="progress-amount__cur" v-text="`$ ` + current" />
            <li class="progress-amount__max" v-text="`$ ` + max" />
        </ul>

        <div class="progress-bar">
            <div class="progress-bar__line" :style="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        current: {
            type: [String, Number],
            default: 0,
        },
        max: {
            type: [String, Number],
            default: 0,
        },
    },

    computed: {
        line: self => 'width:' + self.current / (self.max * 0.01) + '%',
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
