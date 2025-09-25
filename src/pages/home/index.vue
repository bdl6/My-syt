<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { reqHospital } from '@/api/home/index'
import type { Content, HospitalResponseData } from '@/api/home/type'
//分页器页码
const currentPage = ref<number>(1)
//一页展示几条数据
const pageSize = ref<number>(10)
//存储返回的医院数据
const hasHospitalArr = ref<Content>([])
//医院数量
const total = ref<number>(0)
//存储医院的等级相应数据
const hostype = ref<string>('')
//存储医院的地区
const districtCode = ref<string>('')

const getHospitalInfo = async () => {
  const res: HospitalResponseData = await reqHospital(
    currentPage.value,
    pageSize.value,
    hostype?.value,
    districtCode?.value,
  )
  if (res.code !== 200) return
  hasHospitalArr.value = res.data.content
  total.value = res.data.totalElements
}

onMounted(() => {
  getHospitalInfo()
})

const currentChange = () => {
  getHospitalInfo()
}
const sizeChange = () => {
  getHospitalInfo()
}
const getLevel = (level: string) => {
  hostype.value = level
  getHospitalInfo()
}
const getRegion = (region: string) => {
  districtCode.value = region
  getHospitalInfo()
}
</script>

<template>
  <div>
    <Carousel></Carousel>
    <Search></Search>
    <el-row :gutter="20">
      <el-col :span="20">
        <level @getLevel="getLevel"></level>
        <Region @getRegion="getRegion"></Region>

        <div class="hospital">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          ></Card>
        </div>

        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">
        <tip />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
</style>
