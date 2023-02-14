<template>
    <n-collapse :default-expanded-names="expanded" accordion>
        <n-collapse-item name="response" title="响应">
            <n-card style="min-height: 300px">

            </n-card>
        </n-collapse-item>
    </n-collapse>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

defineOptions({ name: 'ResponsePanel' })
const expanded = ref('response')


</script>

<style lang="sass" scoped>
</style>
