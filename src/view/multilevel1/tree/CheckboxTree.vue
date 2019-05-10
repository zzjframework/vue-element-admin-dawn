<template>
  <div style="z-index: 100">
    <div class="checkTreeBox">
      <Tree @on-select-change="selectUnit" class="leftBox " :data="unitTree" :load-data="getChildUnits"></Tree>
      <div class="rightBox ">
        <p class="boxTitle">已选择的机构</p>
        <p v-for="(item,index) in onSelectUnits" :key="index" class="itemClass">
          <span>{{item.fullName}}</span>
          <a v-show="item.isMain!=1" class="delBtn" @click="deleteUnits(item)">
            <Icon type="md-close"/>
          </a>
          <a v-show="item.isMain==1" class="delBtn" style="font-size: 14px;color: #ed4014">主岗</a>
        </p>
      </div>
    </div>
    <div class="buttonStyle">
      <button type="button" class="ivu-btn ivu-btn ivu-btn-primary ivu-btn-large ivu-btn-large" @click="closeModal">确定
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        unitTree: [],
        onSelectUnits: []
      }
    },
    props: {
      selectedUnits: Array,
      isRadio: Boolean,
      readOnly: Boolean
    },
    created() {
      // 初始化机构数
      this.initUnitTree()
    },
    methods: {
      initUnitTree() {
        this.onSelectUnits = this.selectedUnits
        this.$http
          .get('/pc/tree/getUnitTree?unitId=0')
          .then(response => {
            var ret = response.body.ret
            if (ret === 1) {
              this.unitTree = '暂无数据!!!'
              return
            }
            let result = {}
            var unitInfo = response.body.data.unitInfo
            result.title = unitInfo.name
            result.id = unitInfo.id
            result.pid = unitInfo.pid
            result.expand = true
            result.selected = true
            result.fullName = unitInfo.fullName
            result.children = this.getTree(unitInfo.childUnits)
            this.unitTree = [result]
          })
      },
      // 遍历树
      getTree(tree = []) {
        let arr = []
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {}
            obj.title = item.name
            obj.id = item.id // 其他你想要添加的属性
            obj.pid = item.pid
            obj.selected = false
            obj.fullName = item.fullName
            if (item.hasChild === 1) {
              obj.loading = false
              obj.children = [] // 递归调用
            }
            arr.push(obj)
          })
        }
        return arr
      },
      getChildUnits(code, callback) {
        this.$http
          .get('/pc/tree/getUnitTree?unitId=' + code.id)
          .then(response => {
            var ret = response.body.ret
            if (ret === 1) {
              item.expand = false
              item.children = null
            }
            callback(this.getTree(response.body.data.unitInfo.childUnits))
          })
      },
      selectUnit(item) {
        if (this.readOnly) {
          this.$Message.info('您没有修改权限！')
          return
        }
        // 单选
        if (this.isRadio) {
          this.onSelectUnits = item
        } else {
          let flag = true
          this.onSelectUnits.forEach(c => {
            if (item[0].id === c.id) {
              flag = false
            }
          })
          if (flag) {
            this.onSelectUnits.push({id: item[0].id, title: item[0].title, fullName: item[0].fullName, isMain: 0})
          }
        }
      },
      closeModal() {
        if (!this.readOnly) {
          this.$emit('getUnits', this.onSelectUnits)
        }
        this.$Modal.remove()
      },
      deleteUnits(item) {
        if (this.readOnly) {
          this.$Message.info('您没有修改权限！')
          return
        }
        this.onSelectUnits = this.onSelectUnits.filter(t => t.id !== item.id)
      }
    }
  }
</script>
<style>
  .leftBox {
    width: 350px;
    height: 100%;
    padding: 20px;
  }

  .rightBox {
    border-left: 1px solid #E4E6E9;
    padding-left: 20px;
    width: 350px;
    height: 100%;
  }

  .checkTreeBox {
    height: 300px;
    overflow-y: scroll;
  }

  .checkTreeBox > * {
    float: left;
  }

  .boxTitle {
    color: #787878;
    font-size: 18px;
    padding-bottom: 10px;
  }

  .buttonStyle {
    text-align: right;
  }

  .itemClass {
    padding-bottom: 10px;
    position: relative;
  }

  .delBtn {
    font-size: 20px;
    text-align: right;
    height: 14px;
    line-height: 12px;
    position: absolute;
    right: 0px;
    color: #666666;
  }
</style>
