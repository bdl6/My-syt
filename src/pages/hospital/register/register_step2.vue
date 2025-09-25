<template>
  <div class="container">
    <h1 class="tip">
      <SplitText
        text="祝您早日康复!"
        class-name="text-2xl font-semibold text-center"
        :delay="100"
        :duration="0.6"
        ease="power3.out"
        split-type="chars"
        :from="{ opacity: 0, y: 40 }"
        :to="{ opacity: 1, y: 0 }"
        :threshold="0.1"
        root-margin="-100px"
        text-align="center"
      />
    </h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <visitor
          @click="changeIndex(index)"
          v-for="(user, index) in userArr"
          :user="user"
          :key="user.id"
          class="item"
          :currentIndex="currentIndex"
          :index="index"
        >
        </visitor>
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ new Date().toLocaleDateString() }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          医院
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          中医
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          doctor
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          老中医
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          吃饭
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务器:</div>
          </template>
          <span style="color: red">11111</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button type="primary" size="default" @click="submitOrder()">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from '@/components/ShinyText.vue'
import { User } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { reqGetUser } from '@/api/hospital'
import type { UserResponseData, UserArr } from '@/api/hospital/type'
import { useRouter } from 'vue-router'
const $router = useRouter()

//组件挂载完毕获取数据
onMounted(() => {
  //获取就诊人信息
  fetchUserData()
})
//存储全部就诊人信息
const userArr = ref<UserArr>([])
//获取就诊人信息
const fetchUserData = async () => {
  //获取就诊人信息:当前老师的这个账号下曾经已有四个就诊人信息
  //如果你是新的账号切记在已经写好的项目中先注册几个就诊人信息
  const result: UserResponseData = await reqGetUser()
  if (result.code == 200) {
    userArr.value = result.data
  }
}
const currentIndex = ref<number>(-1)
const changeIndex = (index: number) => {
  currentIndex.value = index
}
const submitOrder = async () => {
  $router.push({ path: '/user/order ' })
}
</script>
<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
