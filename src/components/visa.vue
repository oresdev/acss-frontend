<template>
    <figure class="visa">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="visa__icon"
            width="46"
            viewBox="0 0 671 548"
        >
            <path
                d="M0 548h156l263-420L342 0 0 548zm452-365L304 420h145l84 128h138L452 183z"
            />
        </svg>

        <p v-if="number" class="visa__reference">
            {{ number.slice(0, 4) }} <i v-text="'**** ****'" />
            {{ number.slice(12) }}
        </p>

        <p v-else class="visa__reference">
            <i v-text="'**** **** **** ****'" />
        </p>

        <ul class="visa__holder">
            <li>
                Card Holder
                <span v-text="holder ? holder : `VIP MEMBER`" />
            </li>

            <li>
                Expires
                <span v-text="expires ? expires : `00/00`" />
            </li>
        </ul>
    </figure>
</template>

<script>
export default {
    props: {
        number: {
            type: [String, Number],
            default: null,
        },
        holder: {
            type: [String, Number],
            default: null,
        },
        expires: {
            type: [String, Number],
            default: null,
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
