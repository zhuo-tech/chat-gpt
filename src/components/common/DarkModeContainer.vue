<template>
    <div
        :class="inverted ? 'bg-[#001428] text-white' : 'bg-white text-[#333639]'"
        class="dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'DarkModeContainer' })

interface Props {
    inverted?: boolean;
}

withDefaults(defineProps<Props>(), {
    inverted: false,
})
</script>

<style scoped></style>
