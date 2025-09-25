<script setup lang="ts">
import { useUserStore } from './stores/modules/user'
const userStore = useUserStore()
</script>

<template>
  <div class="container">
    <!--顶部全局组件-->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <Login v-if="userStore.visiable" />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
