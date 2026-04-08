<template>
  <div class="auth-layout">
    <!-- 左侧品牌展示区 -->
    <div class="left-section">
      <div class="content">
        <h2 class="title">童心沐光</h2>
        <p class="text">
          AI
          智能情绪识别，专业心理咨询师护航，为你定制个性化成长方案，用温暖陪伴走过每一段时光，守护心灵，向阳而行。
        </p>
        <div class="robot">
          <el-image
            style="width: 90px; height: 90px"
            :src="sunImg"
            alt="童心沐光"
          />
        </div>
      </div>
    </div>
    <!-- 右侧路由视图区（登录/注册表单） -->
    <div class="right-section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
const sunImg = new URL("@/assets/images/sun_login.png", import.meta.url).href;
</script>

<style scoped>
.auth-layout {
  display: flex;
  .left-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: linear-gradient(
      90deg,
      rgb(255, 189, 136) 0%,
      rgb(255, 153, 102) 100%
    );
    background-color: rgba(255, 168, 119, 0.95);
    height: 100vh;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        margin-bottom: 20px;
        font-size: 40px;
        font-weight: bold;
        color: #fff;
      }
      .text {
        margin-bottom: 20px;
        width: 460px;
        font-size: 20px;
        color: #fff;
        text-align: center;
      }
      .robot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        box-shadow:
          0 15px 35px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
    }
  }
  .right-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
