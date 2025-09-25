<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { reqHospitalInfo } from '@/api/home'
import type { HospitalInfo } from '@/api/home/type'
import { useRouter } from 'vue-router'
const hosname = ref<string>('')
const router = useRouter()

const fetchData = async (
  keyword: string,
  cb: (data: { value: string; hoscode: string }[]) => void,
) => {
  const res: HospitalInfo = await reqHospitalInfo(keyword)
  const showData = res.data.map((item) => {
    return {
      value: item.hosname, //展示的医院的名字
      hoscode: item.hoscode, //存储医院的编码
    }
  })
  cb(showData)
}

const goDetail = (item: { value: string; hoscode: string }) => {
  router.push({ path: '/hospital', query: { hoscode: item.hoscode } })
}
</script>

<template>
  <div class="search">
    <el-autocomplete
      @select="goDetail"
      :trigger-on-focus="false"
      clearable
      placeholder="请你输入医院名称"
      v-model="hosname"
      :fetch-suggestions="fetchData"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<style lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  :deep(.el-input__wrapper) {
    width: 600px !important;
    margin-right: 10px;
  }
}
</style>
