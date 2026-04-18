<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon><Back /></el-icon>
        <span>返回首页</span>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>请输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input
            v-model="formData.username"
            size="large"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            size="large"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-button class="btn" size="large" type="primary" @click="submitForm"
          >登录</el-button
        >
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { login } from "@/api/admin";
import { useRouter } from "vue-router";

const ruleFormRef = ref();
const formData = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

//登录
const router = useRouter();
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log(formData, "登录参数");
      login(formData).then((data) => {
        if (!data.token) {
          return console.error("登录失败");
        }
        // 登录成功，将token存储到localStorage
        localStorage.setItem("token", data.token);
        // 登录成功，将用户信息存储到localStorage
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        if (data.userInfo.userType === 2) {
          router.push("/back/dashboard");
        } else {
          router.push("/");
        }
      });
    }
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 384px;

  .title {
    .back-home {
      margin-bottom: 60px;
    }
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
  .form-container {
    margin-top: 30px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      p {
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
</style>
