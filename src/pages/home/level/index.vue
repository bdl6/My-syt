<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="hospital">
        <li :class="{ active: selectedLevel === '' }" @click="selectLevel('')">全部</li>
        <li
          v-for="level in levelArr"
          :key="level.value"
          :class="{ active: selectedLevel === level.value }"
          @click="selectLevel(level.value)"
        >
          {{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHospitalLevelAndRegion } from '@/api/home'
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type'

const levelArr = ref<HospitalLevelAndRegionArr>([])

const selectedLevel = ref<string>('')

onMounted(() => {
  getLevel()
})

// 获取医院等级
const getLevel = async () => {
  const res: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HOSTYPE')
  if (res.code !== 200) return
  levelArr.value = res.data
}

// 选择医院等级，逻辑为谁的值传入selectLevel,显示逻辑为selectedLevel是否等于level.value

const selectLevel = (level: string) => {
  selectedLevel.value = level
  emit('getLevel', level)
}

const emit = defineEmits(['getLevel'])
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  margin-top: 20px;
  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
