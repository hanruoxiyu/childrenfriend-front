<template>
  <div class="login-wrapper" :style="'background-image:url(' + Background + ')'">
    <div class="form-box">
      <div class="form-title">
        <h2>基于树莓派和大模型的儿童学习伴侣系统</h2>
        <!--        <img src="../assets/img/logo.png" alt="icon">-->
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号"
            prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码"
            prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" size="small" type="primary" style="width:100%;"
            @click.native.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" style="width:100%;" @click.native.prevent="hanldeRegister">
            <span>注 册</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login'
import { setToken, getToken } from '../utils/cookie'
import Background from '../assets/img/login-background.jpg'
import FormList from "./knowledge/KGQA";

export default {
  name: 'Login',
  data() {
    return {
      Background,
      loginForm: {
        username: '',
        password: '',
        rememberMe: true
      },
      // 表单验证，需要在el-form-item 元素中增加prop 属性
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      //登录框显示和隐藏
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 注册
    hanldeRegister() {
      this.$router.push('/register')
    },
    // refs.（ref值）获取到的是组件实例，可以使用组件的所有n方法
    // 登陆
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const data = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        if (valid) {
          this.loading = true
          login(data).then(res => {
            this.loading = false
            setToken(res.access)
            //使用vue-router路由到指定页面，该方式称之为编程式导航
            this.$router.push('/home')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;

  .form-box {
    width: 540px;
    padding: 15px 30px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 1, .1);

    .form-title {
      margin: 0 auto 35px;
      text-align: center;
      color: #707070;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}</style>
