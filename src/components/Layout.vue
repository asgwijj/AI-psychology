<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="main-container">
        <Asidebar />
      </el-aside>
      <el-container>
        <el-header>
          <Navbar />
        </el-header>
        <el-main class="main-container">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Asidebar from "./Asidebar.vue";
import Navbar from "./Navbar.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-header {
    height: 74px !important;
  }
  .main-container {
    height: 100%;

    .content-container {
      padding: 20px;
      border-radius: 4px;
      min-height: calc(100% - 74px);
    }
  }
}
</style>
