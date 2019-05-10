<template>
  <div class="checkTreeBox">
    <Tree @on-select-change="selectUnit" :render="isEdit?renderContent:null" :data="unitTree" :load-data="getChildUnits"></Tree>

    <Modal v-model="isAddUnit" title="机构新增" footer-hide draggable>
      <p style="margin-left:10%">机构名称:&nbsp;&nbsp;&nbsp;<Input v-model="unitInfo.name" placeholder="机构名称" style="width: 50%" /></p>
      <br>
       <p style="margin-left:8%">机构排序码:&nbsp;&nbsp; <InputNumber :max="10" :min="0" v-model="unitInfo.srot" style="width:49%"></InputNumber>
        <br>
         <br>
      <p v-show="isAdd" style="margin-left:6%">机构开始时间:&nbsp;&nbsp;<DatePicker v-model="unitInfo.beginTime" type="date" placeholder="机构开始时间" style="width: 48%"></DatePicker>
      </p>

      <br><br>
      <footer style="text-align: right">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="saveUnit" style="margin-left: 8px">提交</Button>
      </footer>
    </Modal>
  </div>
</template>

<script>
import Footer from 'iview/src/components/layout/footer'

export default {
  components: { Footer },
  props: {
    isEdit: Boolean
  },
  data () {
    return {
      unitTree: [],
      isAddUnit: false,
      isAdd: true,
      unitInfo: {},
      addData: {},
      renameNode: {},
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
    // 初始化机构数
    this.initUnitTree()
  },
  methods: {
    initUnitTree () {
      this.$http.get('/pc/tree/getUnitTree?unitId=0').then(response => {
        // console.log('CODE' + response.code)
        var ret = response.body.ret

        if (ret === 1) {
          this.unitTree = '暂无数据!!!'
          return
        }
        let result = {}

        var unitInfo = response.body.data.unitInfo
        // 更新员工列表
        this.$emit('tree-list', response.body.data.unitInfo)
        if (unitInfo) {
          this.$emit('initStaffList', unitInfo.id)
          result.title = unitInfo.name
          result.id = unitInfo.id
          result.pid = unitInfo.pid
          result.expand = true
          result.selected = true
          result.fullName = unitInfo.fullName
          result.children = this.getTree(unitInfo.childUnits)
        } else {
        }
        if (this.isEdit) {
          result.render = (h, { root, node, data }) => {
            return h(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  padding: '2px 6px',
                  borderRadius: '5px'
                },
                attrs: {
                  class: 'unitTreeNodes'
                },
                on: {
                  click: event => {
                    this.selectStyle(event)
                    this.selectUnit(node)
                  }
                }
              },
              [
                h('span', [h('span', data.title)]),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      float: 'right',
                      marginRight: '3px'
                    }
                  },
                  [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-add',
                        type: 'primary'
                      }),
                      style: {
                        marginRight: '5px',
                        height: '20px',
                        padding: '0',
                        width: '40px'
                      },
                      on: {
                        click: () => {
                          this.append(data)
                        }
                      }
                    }),
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-create-outline'
                      }),
                      style: {
                        marginRight: '4px',
                        height: '20px',
                        padding: '0',
                        width: '40px'
                      },
                      on: {
                        click: () => {
                          this.rename(node)
                        }
                      }
                    })
                  ]
                )
              ]
            )
          }
        }
        this.unitTree = [result]
      })
    },
    // 遍历树
    getTree (tree = []) {
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
    getChildUnits (code, callback) {
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
    selectUnit (node) {
      this.$emit('initStaffList', node.node.id)
    },
    // 机构数编辑
    renderContent (h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%',
            padding: '2px 6px',
            borderRadius: '5px'
          },
          attrs: {
            class: 'unitTreeNodes'
          },
          on: {
            click: event => {
              this.selectStyle(event)
              this.selectUnit(node)
            }
          }
        },
        [
          h('span', [h('span', data.title)]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '2px'
              }
            },
            [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-add'
                }),
                style: {
                  marginRight: '5px',
                  height: '20px',
                  padding: '0',
                  width: '25px'
                },
                on: {
                  click: () => {
                    this.append(data)
                  }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-create-outline'
                }),
                style: {
                  marginRight: '5px',
                  height: '20px',
                  padding: '0',
                  width: '25px'
                },
                on: {
                  click: () => {
                    this.rename(node)
                  }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-remove'
                }),
                style: {
                  marginRight: '5px',
                  height: '20px',
                  padding: '0',
                  width: '25px'
                },
                on: {
                  click: () => {
                    this.remove(root, node, data)
                  }
                }
              })
            ]
          )
        ]
      )
    },
    saveUnit () {
      // 新增时展示时间
      if (this.isAdd) {
        this.addUnit()
      } else {
        this.updateUnit()
      }
    },
    addUnit () {
      if (this.unitInfo === {}) {
        return
      }
      if (
        this.unitInfo.name === undefined ||
        this.unitInfo.name.trim() === ''
      ) {
        this.$Message.error('请填写机构名称')
        return
      }
      if (this.unitInfo.beginTime === '') {
        this.$Message.error('请选择机构开始时间')
        return
      }
      let that = this
      let datas = {
        name: this.unitInfo.name,
        beginTime: this.unitInfo.beginTime.toLocaleDateString(),
        parentId: this.addData.id
      }
      this.$http
        .post('/pc/tree/addUnit', datas, this.options)
        .then(function (response) {
          that.$Message.success(response.body.msg)
          if (response.body.ret === 0) {
            that.$http
              .get('/pc/tree/getUnitTree?unitId=' + that.addData.id)
              .then(response => {
                var ret = response.body.ret
                if (ret === 0) {
                  const children = that.getTree(
                    response.body.data.unitInfo.childUnits
                  )
                  that.$set(that.addData, 'children', children)
                  that.isAddUnit = false
                  that.unitInfo = {}
                }
              })
          }
        })
    },
    updateUnit () {
      if (
        this.unitInfo.name.trim() === '' ||
        this.unitInfo.name === undefined
      ) {
        this.$Message.error('请填写机构名称')
        return
      }
      if (this.unitInfo.name.trim() === this.renameNode.node.title.trim()) {
        this.$Message.error('机构名称未改变')
        return
      }
      let that = this
      this.$http
        .post(
          '/pc/tree/updateUnit',
          { id: this.unitInfo.id, name: this.unitInfo.name },
          this.options
        )
        .then(function (response) {
          that.$Message.success(response.body.msg)
          if (response.body.ret === 0) {
            that.renameNode.node.title = that.unitInfo.name
            that.isAddUnit = false
          }
        })
    },
    cancel () {
      this.isAddUnit = false
      this.unitInfo = {}
    },
    append (data) {
      this.isAddUnit = true
      this.isAdd = true
      this.addData = data
      return false
    },
    rename (node) {
      this.unitInfo.id = node.node.id
      this.unitInfo.name = node.node.title
      this.isAddUnit = true
      this.isAdd = false
      this.renameNode = node
      return false
    },
    remove (root, node, data) {
      let that = this
      this.$Modal.confirm({
        width: 400,
        title: '系统提示',
        content: '确认要删除名称为：[' + node.node.title + '] 的机构吗?',
        onOk () {
          that.$http
            .post('/pc/tree/deleteUnit', { id: node.node.id }, that.options)
            .then(function (response) {
              that.$Message.success(response.body.msg)
              if (response.body.ret === 0) {
                const parentKey = root.find(el => el === node).parent
                const parent = root.find(el => el.nodeKey === parentKey).node
                const index = parent.children.indexOf(data)
                parent.children.splice(index, 1)
              }
            })
        }
      })
      return false
    },
    selectStyle (event) {
      var className = document.getElementsByClassName('unitTreeNodes')
      for (let i = 0; i < className.length; i++) {
        className[i].style.backgroundColor = '#fff'
      }
      event.currentTarget.style.backgroundColor = '#eeeeee'
    }
  }
}
</script>

<style scoped>
</style>
