<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user'
import { useRoute } from 'vue-router'
const route = useRoute()
SET_TOKEN(route.query as any)
//次路由组件代码执行:授权成功
const html: any = document.querySelector('html')
html.style.display = 'none'
</script>

<template>
  <div></div>
</template>

<style scoped></style>
