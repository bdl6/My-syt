<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{ active: selectedRegion === '' }" @click="selectRegion('')">全部</li>
        <li
          v-for="region in regionArr"
          :key="region.value"
          :class="{ active: selectedRegion === region.value }"
          @click="selectRegion(region.value)"
        >
          {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { reqHospitalLevelAndRegion } from '@/api/home'

import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type'

import { defineEmits } from 'vue'

const regionArr = ref<HospitalLevelAndRegionArr>([])

const selectedRegion = ref<string>('')
onMounted(() => {
  getRegion()
})

const getRegion = async () => {
  const res: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
  if (res.code !== 200) return
  regionArr.value = res.data
}

const selectRegion = (region: string) => {
  selectedRegion.value = region
  emit('getRegion', region)
}
const emit = defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 50px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>
