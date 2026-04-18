<template>
  <div class="frontend-layout">
    <!-- 导航栏容器 -->
    <div class="navbar-container">
      <div class="brand-section">
        <!-- 品牌 Logo 图片 -->
        <el-image
          style="width: 50px; height: 50px"
          :src="iconUrl"
          alt="品牌logo"
          class="brand-logo"
        />
        <!-- 品牌名称 -->
        <h1 class="brand-name">心理健康AI助手</h1>
      </div>

      <div class="nav-section">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/consultation" class="nav-link" v-if="isLoggedIn"
          >AI咨询</router-link
        >

        <router-link to="/emotion-diary" class="nav-link">情绪日记</router-link>

        <!-- 知识库路由链接 -->
        <router-link to="/knowledge" class="nav-link">知识库</router-link>

        <!-- 退出登录按钮 -->
        <el-button v-if="isLoggedIn" class="logout-btn" @click="handleLogout"
          >退出登录</el-button
        >

        <template v-else>
          <router-link to="/auth/login" class="nav-link">登录</router-link>
          <router-link to="/auth/register" class="nav-link">
            <el-button type="primary">注册</el-button>
          </router-link>
        </template>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <router-view></router-view>
    </div>

    <!-- 页脚容器 -->
    <div class="footer-container">
      <div class="footer-bottom">
        <p>&copy; 2023 心理健康AI助手. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { logout } from "@/api/admin";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// 定义静态资源图片 URL
const iconUrl = new URL("@/assets/images/sun.png", import.meta.url).href;
const isLoggedIn = ref(false);

// 退出登录
const handleLogout = () => {
  logout().then(() => {
    // 清除 localStorage 中的 token
    localStorage.removeItem("token");
    // 清除 localStorage 中的 userInfo
    localStorage.removeItem("userInfo");
    // 跳转到登录页
    router.push("/auth/login");
  });
};

onMounted(() => {
  //检查是否登录
  isLoggedIn.value = localStorage.getItem("token") !== null;
});
</script>
<style>
.frontend-layout {
  background-color: #fff;
  .navbar-container {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brand-section {
      display: flex;
      align-items: center;
      .brand-name {
        margin-left: 10px;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }
    }
    .nav-section {
      display: flex;
      align-items: center;
      gap: 40px;
      .nav-link {
        color: #4b5563;
        font-size: 16px;
        font-weight: 500;
        &:hover {
          color: #4a90e2;
        }
      }
    }
  }

  .footer-container {
    background: #1f2937;
    color: white;
    padding: 15px 0;
    margin-top: auto;
    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
