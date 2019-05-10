<style>
  #card {
    position: relative;
  }

  #tree, #table {
    position: absolute;
    float: left;
  }
</style>
<template>
  <div id="card">
    <div id="tree" style="width:22%;float: left;">
      <Card>
        <div>
          <Input search enter-button="筛选" placeholder="请输入" style="width:90% ;float: left"/>&nbsp;&nbsp;&nbsp;
        </div>
        <br>
        <div style="font-size:10px ;margin-top: 20px">
          <Divider>组织结构</Divider>
        </div>
          <unit-tree :isEdit="isEdit" @tree-list = "treeStaffList"></unit-tree>
          <div v-if="trueListshow" >
            <Form ref="mechanism" :model="mechanism" :rules="ruleInline" label='sd' inline>
                <FormItem prop="name">
                    <Input type="text" v-model="mechanism.name" placeholder="机构名称">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="time">
                  <DatePicker v-model="mechanism.time" type="date" placeholder="机构开始时间" style="width: 100%">
                    <Icon type="ios-alarm-outline" slot="prepend"></Icon>
                  </DatePicker>
                </FormItem>
                <br>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('mechanism')">确定</Button>
                </FormItem>
            </Form>
          </div>
      </Card>
    </div>
    <div id="table" style="width:75%;float:left;margin-left:25%">
      <Card>
        <Divider style="margin-top: 30px">员工信息表</Divider>
        <div style="width:auto">
          <private-table></private-table>
          <tablepage></tablepage>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import privateTable from './form/privateTable'
import tablepage from './form/tablepage'
import unitTree from './tree/UnitTree'

export default {
  components: {
    privateTable,
    tablepage,
    unitTree
  },
  data () {
    return {
      trueListshow: true,
      treeList: '',
      mechanism: {
        name: '',
        time: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入必输参数', trigger: 'blur' }
        ]
      },
      isEdit: false,
      unitInfo: {
        name: null,
        beginTime: null,
        parentId: null,
        avatarId: null
      },
      unitTree: []
    }
  },

  methods: {
    treeStaffList (date) {
      date ? this.trueListshow = false : this.trueListshow = true
    },
    // 新增机构
    handleSubmit (name) {
      let that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.mechanism.time === '') {
            this.$Message.error('请选择机构开始时间')
            return
          }
          let datas = {
            name: this.mechanism.name,
            beginTime: this.mechanism.time.toLocaleDateString(),
            parentId: 0
          }
          this.$http
            .post('/pc/tree/addUnit', datas, this.options)
            .then(function (response) {
              // that.$Message.success(response.body.msg)
              that.$Notice.open({
                title: '系统提示',
                desc: '新增成功',
                duration: 3
              })
            })
        } else {
          this.$Message.error('请按标准输入数据!')
        }
      })
    }
  }
}
</script>
