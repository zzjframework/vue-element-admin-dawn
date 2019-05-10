<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <div @click="getUserRoleAss">点击</div>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      user: {
        name: 'hr',
        user_id: '3',
        access: ['1'],
        token: 'hr',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
      }
    }
  },
  mounted () {
    // this.getUserRole()
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'getUserRole'
    ]),
    handleSubmit ({ userName, password }) {
      console.log(userName, password)
      this.handleLogin({ userName, password }).then(res => {
        console.log(this.$config.homeName)
        this.getUserInfo().then(res => {
          console.log(res)
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    getUserRoleAss () {
      console.log(this.user)
      const user = this.user
      this.getUserRole({ user }).then(res => {
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
}
</script>

<style>

</style>
