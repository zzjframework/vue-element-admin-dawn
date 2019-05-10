<template>
  <div>

    <h1>1111111111111111111111</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // url: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?agentid=1000003&appid=wx51e4942c25972483&redirect_uri=http%3A%2F%2Fdongz.store%2F%2FgkWeChatCallback'
      url: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?agentid=1000003&appid=wx51e4942c25972483&redirect_uri=http%3A%2F%2Fdongz.store'
    }
  },
  created () {
    // 初始化机构数
    this.initDetail()
  },
  mounted () {
  },
  methods: {
    initDetail (row) {
      this.$http.get('/tyoa/pc/staff/getStaffInfo?staffId=1', this.options)
        .then(function (response) {
          console.log(response)
          this.Initrow = response.body.code
          console.log('cccc::' + response.body.code)
          if (response.body.code === 800401) {
            window.location.href = this.url
          }
        })
    }
  }

}
</script>

<style scoped>

</style>
