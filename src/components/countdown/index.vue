<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const time = ref<number>(5)
const props = defineProps(['countStart'])
const emit = defineEmits(['count-end'])
watch(
  () => props.countStart,
  () => {
    const timer = setInterval(() => {
      time.value--
      if (time.value === 0) {
        emit('count-end', false)
        clearInterval(timer)
      }
    }, 1000)
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <span>获取验证码({{ time }}s)</span>
  </div>
</template>

<style scoped></style>
