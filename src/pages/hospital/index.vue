<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import useDetailStore from '@/stores/modules/hospitalDetail'
import { onMounted } from 'vue'
const $router = useRouter()
const $route = useRoute()
const detailStore = useDetailStore()
const changeActive = (path: string) => {
  //跳转到对应二级路由
  $router.push({ path, query: { hoscode: $route.query.hoscode } })
}
onMounted(() => {
  detailStore.getHospitalDetail($route.query.hoscode as string)
  detailStore.getDeparment($route.query.hoscode as string)
})
</script>

<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><setting /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><InfoFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域:路由组件展示位置 -->
    <div class="content">
      <!-- 子组件展示结构地方 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hospital {
  display: flex;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      color: #7f7f7f;
    }
  }
  .content {
    flex: 8;
  }
}
</style>
