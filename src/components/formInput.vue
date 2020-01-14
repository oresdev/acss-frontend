<template>
    <label v-if="type == 'text' || type == 'password'" :for="name">
        {{ $t(`form.` + name) }}

        <input
            :type="type"
            :name="name"
            :value="
                date
                    ? formatDate(value)
                    : pinyin
                    ? formatText(value)
                    : value || data
            "
            :placeholder="placeholder"
            v-on:input="$emit('input', $event.target.value)"
            autocomplete="off"
        />
    </label>

    <label v-else-if="type == 'select'" :for="name">
        {{ $t(`form.` + name + `.title`) }}

        <ul class="select">
            <li
                :class="[{ open: turned }, 'select--selected']"
                v-for="i in data"
                :key="i.index"
                v-on:click="turned = !turned"
            >
                <span
                    v-if="value ? value == i.key : i.key == 'null'"
                    v-text="i.name"
                />
            </li>

            <!--  -->
            <ul :class="[{ 'select--hide': !turned }, 'select__items']">
                <li
                    class="select__item"
                    v-for="i in data"
                    :key="i.index"
                    :value="value"
                    v-on:click="
                        $emit('input', ($event.target.value = i.key)),
                            update(i.name)
                    "
                    v-text="i.name"
                />
            </ul>
        </ul>
    </label>

    <label v-else-if="type == 'file'" :for="name">
        {{ $t(`form.` + name) }}

        <tumbler
            v-if="file"
            class="label__tumbler"
            :label="$t(`form.file`)"
            :src="url ? url : file"
            modal
        />

        <input type="file" ref="file" v-on:change="upload()" />
        <button
            v-if="!file"
            class="button button-default"
            type="button"
            v-text="$t(`form.attach`)"
            v-on:click="choose()"
        />
        <p
            v-if="file"
            class="label__link"
            v-text="$t(`form.detach`)"
            v-on:click="clear()"
        />
    </label>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        name: {
            type: String,
            default: null,
        },
        value: {
            type: [String, Object, File, Number],
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        data: {
            type: [Array, String],
            default: null,
        },
        date: {
            type: Boolean,
            default: false,
        },
        pinyin: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            selected: this.value ? this.value : null,
            turned: false,
            file: this.data ? this.data : null,
            url: null,
        }
    },

    methods: {
        formatDate: date =>
            date
                ? date
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('.')
                : '',
        formatText: str => (str ? str.replace(/[A-Za-zА-Яа-я0-9_]/g, '') : ''),
        choose() {
            this.$refs.file.click()
        },
        update(name) {
            this.selected = name
            this.turned = !this.turned
        },
        upload() {
            this.file = event.target.files[0]

            this.url = URL.createObjectURL(this.file)

            this.$emit('input', this.file)
        },
        clear() {
            this.file = ''
            this.$emit('input', null)
        },
    },
}
</script>

<style lang="scss" scoped></style>
