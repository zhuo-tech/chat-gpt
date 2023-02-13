<template>
    <div>
        <canvas ref="domRef" class="cursor-pointer" height="40" width="152" @click="getImgCode"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useImageVerify } from '@/hooks'

defineOptions({ name: 'ImageVerify' })

interface Props {
    code?: string;
}

const props = withDefaults(defineProps<Props>(), {
    code: '',
})

interface Emits {
    (e: 'update:code', code: string): void;
}

const emit = defineEmits<Emits>()

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify()

watch(
    () => props.code,
    newValue => {
        setImgCode(newValue)
    },
)
watch(imgCode, newValue => {
    emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>

<style scoped></style>
