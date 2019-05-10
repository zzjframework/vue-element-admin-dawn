<!--suppress ALL -->
<style>
  #card1,
  #card6 {
    float: left;
  }

  #card6 {
    margin-top: 1%;
  }

  #content {
    position: relative;
  }

  .ivu-menu {
    z-index: 100 !important;
  }
</style>
<template>
  <div id="content">
    <div id="card3">
      <div id="card1" style="width:25%;margin-top:0.7%;">
        <Card style="height:700px">
          <Button type="primary" shape="circle" style="">同步企业微信</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;

          <div style="font-size:10px ;margin-top: 20px">
            <Divider>组织结构</Divider>
          </div>
          <unit-tree :isEdit="isEdit" @initStaffList="initStaffList" @tree-list = "treeStaffList"></unit-tree>
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
    </div>
    <div id="card5" style="margin-left:26%;">
      <Layout>
        <div id="card6" style="width:auto;float: left;height:900px">
          <Card style="height: 80%">

            <template>
              <Button @click="addStaff" type="primary" style="margin-left:5px">新增员工信息</Button>
              <Modal :transfer="false" :draggable="true" :z-index="500" v-model="isAddStaff" width="800" title="新增员工">
                <add-staff :message="staffInfo" @isShowModal="isShowModal"></add-staff>
                <div slot="footer">
                  <Button type="primary" size="large" @click="cancelModal">取消</Button>

                </div>
              </Modal>
            </template>
            <Divider>员工基本信息表</Divider>
            <div id="table1">
              <template>
                <!--员工详情-->
                <Drawer title="详细信息" width="512" :closable="false" v-model="Detail">
                  <detail-page :detaildata="Initrow" v-if="Detail"></detail-page>
                </Drawer>
                <!--//修改员工信息-->
                <Modal v-model="updateMolde" width="700xp">
                  <br><br>
                  <Scroll>
                    <update-page :formValidate="formValidate"  @isShowModal="isShowModal">

                    </update-page>
                  </Scroll>
                  <div slot="footer">
                    <Button type="primary" size="large" @click="cancelModal11">取消</Button>

                  </div>

                </Modal>
                <Table border :columns="historyColumns" :data="historyData" size="small">
                  <template slot-scope="{ row, index }" slot="action">
                    <template>
                      <Button @click="initDetail(row)" type="primary" shape="circle" size="small">详情</Button>
                    </template>
                    <template>
                      <Button @click="initupadte(row)" type="info" shape="circle" size="small" style="margin-left: 5px">
                        修改
                      </Button>
                    </template>
                    <!--删除-->
                    <template>
                      <Button type="error" @click="modaldeleteStaff = true" shape="circle" size="small"
                              style=" margin-left:5px;">删除
                      </Button>
                      <Modal v-model="modaldeleteStaff" title="删除操作" @on-ok="deleteStaff(row)">
                        <p>您确定删除该条员工信息吗？</p>
                      </Modal>
                    </template>
                  </template>
                </Table>
              </template>
              <template>
                <!--//修改员工详情Midal-->
              </template>
            </div>
            <div id="page">
              <template>
                <Page show-sizer class="paging" :current="pageInfo.pageIndex" :page-size="pageInfo.pageSize"
                      :total="pageInfo.dataCount" @on-change="pageChange"
                      @on-page-size-change="pageSizeChange" style="margin-top:30%x">
                </Page>
              </template>
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  </div>
</template>
<script>
import addStaff from './form/addStaff'
import detailPage from './form/detailPage'
import updatePage from './form/updatePage'
import unitTree from './tree/UnitTree'

export default {
  components: {
    updatePage,
    addStaff,
    detailPage,
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
      formValidate: {},
      isEdit: true,
      Initrow: '',
      modaldeleteStaff: false,
      isAddStaff: false,
      updateMolde: false,
      Detail: false,
      modal1: false,
      value5: false,
      theme1: 'primary',
      value9: [],
      cityList: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      cityList19: [
        {
          value: '2',
          label: '正式'
        },
        {
          value: '4',
          label: '外包'
        },
        {
          value: '6',
          label: '合作伙伴'
        }
      ],

      cityList20: [
        {
          value: '0',
          label: '未知'
        },
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      historyColumns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '职务',
          key: 'title'
        },
        {
          title: '部门',
          key: 'units',
          sortable: true
        },
        {
          title: '手机',
          key: 'mobile'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      historyData: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        dataCount: 0
      },
      staffUnits: [],
      unitInfo: {
        name: null,
        beginTime: null,
        parentId: null
      },
      staffInfo: {
        chnName: null,
        engName: null,
        gender: null,
        idCard: null,
        email: null,
        mobile: null,
        telephone: null,
        address: null,
        avatarId: null,
        isMain: null,
        staffType: null,
        unitId: null
      },
      onSelectNode: null,
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
  },
  methods: {
    // 新增机构
    handleSubmit (name) {
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
            .post('/api/pc/tree/addUnit', datas, this.options)
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
    },
    // 员工详情
    initDetail (row) {
      this.$http.get('/api/pc/staff/getStaffInfo?staffId=' + row.id, this.options)
        .then(function (response) {
          this.Initrow = response.data.data

          this.Detail = true
        })
    },
    // 员工修改获取信息
    initupadte (row) {
      this.$http.get('/api/pc/staff/getStaffInfo?staffId=' + row.id, this.options)
        .then(function (response) {
          response.data.data.id = row.id
          this.formValidate = response.data.data
          this.updateMolde = true
        })
    },

    initStaffList (curUnitId) {
      this.getStaffList(curUnitId)
    },

    treeStaffList (date) {
      this.treeList = date
      this.treeList !== 1 ? this.trueListshow = false : this.trueListshow = true
    },
    // 遍历员工信息
    getStaffList (curId) {
      this.pageInfo.pageIndex = 1
      this.queryStaffList(curId)
    },
    queryStaffList (curId) {
      let params = {
        params: {
          unitId: curId,

          pageIndex: this.pageInfo.pageIndex,
          pageSize: this.pageInfo.pageSize
        }
      }
      this.$http
        .get('/api/pc/tree/getStaffListByUnitId', params)
        .then(response => {
          let result = response.body.Data
          this.pageInfo.dataCount = response.body.TotalRow
          let tableRows = []
          result.forEach(item => {
            let obj = {}
            obj.name = item.chName
            obj.mobile = item.baseInfo.mobile
            obj.email = item.baseInfo.email
            obj.id = item.id
            let units = ''
            let title = ''
            for (let i = 0; i < item.unitInfo.length; i++) {
              if (item.unitInfo[i].title) {
                title += item.unitInfo[i].name + ':' + item.unitInfo[i].title
                if (i >= 0 && i < item.unitInfo.length - 1) {
                  title += '——'
                }
              }
            }
            if (title === '' || title === undefined) {
              title = '暂无'
            }
            obj.title = title

            item.unitInfo.forEach(unitInfo => {
              units += unitInfo.name + ','
            })
            obj.units = units =
                units.lastIndexOf(',') === units.length - 1
                  ? units.substring(0, units.lastIndexOf(','))
                  : units
            tableRows.push(obj)
          })
          this.historyData = tableRows
        })
    },
    // 设置每页显示大小
    pageSizeChange (item) {
      this.pageInfo.pageIndex = 1
      this.pageInfo.pageSize = item
      let selectedNode = this.$refs.tree.getSelectedNodes()
      if (this.isSelectedUnit(this.onSelectNode)) {
        this.queryStaffList(selectedNode.id)
      }
    },
    // 翻页
    pageChange (item) {
      this.pageInfo.pageIndex = item
      if (this.isSelectedUnit(this.onSelectNode)) {
        this.queryStaffList(this.onSelectNode.id)
      }
    },
    // 是否选择机构
    isSelectedUnit (selectedNode) {
      if (selectedNode === null) {
        this.$Notice.open({
          title: '系统提示',
          desc: '请选择机构',
          duration: 10
        })
        return false
      }
      this.unitInfo.parentId = selectedNode.id
      return true
    },
    // 取消新增
    cancelModal () {
      this.unitInfo.name = null
      this.unitInfo.beginTime = null
      this.deleteUnitName = null
      this.modal1 = false
      this.deleteUnitModal = false
      this.isAddStaff = false
    },
    // 取消修改
    cancelModal11 () {
      this.updateMolde = false
    },
    // 新增员工
    iscreateStaff () {
      if (this.isSelectedUnit(this.onSelectNode)) {
        this.staffInfo.parentId = this.onSelectNode.id
        this.modal13 = true
      }
    },
    // 员工信息信新增
    addStaff () {
      this.isAddStaff = true
    },
    // 关闭窗口
    isShowModal (item) {
      this.isAddStaff = false
      this.updateMolde = false
    },

    // 删除员工信息
    deleteStaff (row) {
      let that = this
      this.$http
        .post('/api/pc/staff/deleteStaff', {staffId: row.id}, this.options)
        .then(response => {
          var result = response.body.ret
          if (result === 0) {
            that.$Notice.open({
              title: '系统提示',
              desc: '删除成功',
              duration: 3
            })
            that.getStaffList(
              this.onSelectNode == null ? 0 : this.onSelectNode.id
            )
          }
        })
    }

  },
  mounted () {
  }
}
</script>
