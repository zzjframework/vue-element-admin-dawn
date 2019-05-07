<template>
    <Table :columns="columns1" :data="data1"></Table>
</template>
<script>
import { getTestData } from '@/api/data'
export default {
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [],
      options: {
        emulateJSON: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8;',
          id: '1',
          name: 'dz'
        }
      }
    }
  },
  created () {
    this.initData()
    this.getDataGet()
    this.getDataPost()
  },
  methods: {
    initData () {
      this.data1 = []
      getTestData().then(res => {
        this.data1 = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    getDataGet () {
      console.log('getDataGet')
      this.$http
        .get('/api/pc/tree/getUnitTree?unitId=0')
        .then(response => {
          console.log(response)
        })
    },
    getDataPost () {
      console.log('getDataPost')
      // 员工信息信新增
      let staff = {
        'isMain': 1,
        'avatarId': 1,
        'staffType': 1,
        'unitId': 1,
        'chnName': 1,
        'engName': 1,
        'email': 1,
        'gender': 1,
        'telephone': 1,
        'mobile': 1,
        'idCard': 1,
        'address': 1
      }
      this.$http
        .post('/api/pc/staff/createStaff', staff)
        .then(function (response) {
          if (response.body.ret === 1) {
            this.$Notice.open({
              title: '系统提示',
              desc: response.body.msg,
              duration: 10
            })
            return false
          } else {
            this.$Message.error({
              content: '新增成功',
              duration: 1
            })
            this.$emit('isShowModal', '')
          }
          // 将文本框中的值清空
          this.staffInfo = null
        })
    }
  }
}
</script>
