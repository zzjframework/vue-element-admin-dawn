<template>
  <div id="page">

    <template>
      <button></button>
      <Page show-sizer class="paging" :current="pageInfo.pageIndex" :page-size="pageInfo.pageSize"
            :total="pageInfo.dataCount" @on-change="pageChange"
            @on-page-size-change="pageSizeChange">
      </Page>
    </template>
  </div>

</template>

<script>

export default {
  name: 'tablepage',
  data () {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        dataCount: 0
      }
    }
  },
  methods: {
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
        .get('/pc/tree/getStaffListByUnitId', params)
        .then(response => {
          console.log(response)
          let result = response.body.Data
          this.pageInfo.dataCount = response.body.TotalRow
          let tableRows = []
          result.forEach(item => {
            let obj = {}
            obj.name = item.chName
            obj.title = item.unitInfo.title
            obj.mobile = item.baseInfo.mobile
            obj.email = item.baseInfo.email
            obj.id = item.id

            let units = ''
            item.unitInfo.forEach(unitInfo => {
              units += unitInfo.name + ','
            })
            obj.units = units =
                  units.lastIndexOf(',') === units.length - 1
                    ? units.substring(0, units.lastIndexOf(','))
                    : units
            tableRows.push(obj)
          })
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
    }
  }
}
</script>

<style scoped>

</style>
