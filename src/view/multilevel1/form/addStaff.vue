<template>
  <Form ref="staffInfo" :model="staffInfo" :rules="ruleValidate" :label-width="80"
        style="max-height: 450px;overflow-y: scroll">
    <FormItem label="头像" prop="avatarId">
      <Upload action="" ref="upload" style="width: 50px;" :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              v-model="staffInfo.avatarId"
              :max-size="2048" type="drag">
        <div>
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="员工姓名:" prop="chnName" style="width: 80%">
      <Input placeholder="请输入员工姓名"
             v-model="staffInfo.chnName"/>
    </FormItem>
    <FormItem label="英文名称:" prop="engName" style="width: 80%">
      <Input placeholder="请输入英文名" v-model="staffInfo.engName"/>
    </FormItem>
    <FormItem label="员工性别:" prop="gender">
      <RadioGroup v-model="staffInfo.gender">
        <Radio v-for="item in sexList" :key="item.value" :label="item.value">{{item.label}}</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="主岗机构:" prop="unitId">
      <Icon v-show="isShow" style="font-size: 18px;" @click="selectUnit" type="md-add"/>
      <span  class="units" @click="selectUnit" v-for="(item, index) in staffUnits" :key="index">
            {{item.title}}
          </span>
    </FormItem>
    <FormItem label="员工类型:" prop="staffType" style="width: 80%">
      <Select v-model="staffInfo.staffType">
        <Option v-for="item in staffTypeList" :key="item.label" :value="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="联系电话:" prop="mobile" style="width: 80%">
      <Input placeholder="请输入电话号码" v-model="staffInfo.mobile"/>
    </FormItem>
    <FormItem label="身份证号:" prop="idCard" style="width: 80%">
      <Input placeholder="请输入身份证信息" v-model="staffInfo.idCard"/>
    </FormItem>
    <FormItem label="联系邮箱:" prop="email" style="width: 80%">
      <Input placeholder="Email" v-model="staffInfo.email"/>
    </FormItem>
    <FormItem label="固定电话:" prop="telephone" style="width: 80%">
      <Input placeholder="请输入固定电话" v-model="staffInfo.telephone"/>
    </FormItem>
    <FormItem label="联系地址:" prop="address" >
      <Input type="textarea" placeholder="请输入地址" v-model="staffInfo.address"/>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('staffInfo')">重置</Button>
      <Button type="primary" @click="handleSubmit('staffInfo')" style="margin-left: 8px">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
import CheckBoxTree from '../tree/CheckboxTree'

export default {
  name: 'addStaff',
  components: { CheckBoxTree },
  props: {
    message: Object
  },
  data () {
    return {

      options: {
        emulateJSON: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          id: '1',
          name: 'dz'
        }
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
        staffType: null,
        unitId: null
      },
      staffUnits: [],
      // 机构是否是单选
      isRadio: true,
      staffTypeList: [
        {
          value: 2,
          label: '正式'
        },
        {
          value: 4,
          label: '外包'
        },
        {
          value: 6,
          label: '合作伙伴'
        }
      ],
      sexList: [
        {
          value: 0,
          label: '未知'
        },
        {
          value: 1,
          label: '男'
        },
        {
          value: 2,
          label: '女'
        }
      ],
      ajax: {},
      ruleValidate: {
        chnName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        engName:
            [
              { required: true, message: '英文名不能为空', trigger: 'blur' }
            ],
        gender:
            [
              { required: true, type: 'number', message: '性别不能为空', trigger: 'change' }
            ],
        unitId:
            [
              { required: true, type: 'number', message: '主岗不能为空', trigger: 'change' }
            ],
        mobile:
            [
              { required: true, message: '联系电话不能为空', trigger: 'blur' },
              { pattern: '^[1][3,4,5,7,8][0-9]{9}$', message: '联系电话格式错误', trigger: 'blur' }
            ],
        idCard:
            [
              { required: true, message: '身份证号不能为空', trigger: 'blur' }
            ],
        staffType:
            [
              { required: true, type: 'number', message: '员工类型不能为空', trigger: 'change' }
            ],
        avatarId:
            [
              { required: false }
            ],
        email:
            [
              { required: false },
              { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
            ],
        address:
            [
              { required: false }
            ],
        telephone:
            [
              { required: false }
            ]
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
    isShow () {
      if (this.staffUnits.length === 0 || !this.isRadio) {
        return true
      }
      return false
    }
  },
  methods: {
    init () {
      this.staffInfo = this.message
    },
    // 员工选择机构
    selectUnit () {
      let that = this
      this.$Modal.confirm({
        width: 800,
        title: '选择主岗机构',
        cancelText: ' ',
        okText: '返回',
        render: h => {
          return h(CheckBoxTree, {
            props: {
              selectedUnits: that.staffUnits,
              isRadio: that.isRadio,
              readOnly: false
            },
            on: {
              getUnits: (units) => {
                that.staffUnits = units
                if (units.length === 0) {
                  return
                }
                that.staffInfo.unitId = units[0].id
              }
            }
          })
        }
      })
    },
    createStaff () {
      let staff = {
        'isMain': 1,
        'avatarId': this.staffInfo.avatarId,
        'staffType': this.staffInfo.staffType,
        'unitId': this.staffInfo.unitId,
        'chnName': this.staffInfo.chnName,
        'engName': this.staffInfo.engName,
        'email': this.staffInfo.email,
        'gender': this.staffInfo.gender,
        'telephone': this.staffInfo.telephone,
        'mobile': this.staffInfo.mobile,
        'idCard': this.staffInfo.idCard,
        'address': this.staffInfo.address
      }
      // 员工信息信新增
      this.$http
        .post('/pc/staff/createStaff', staff, this.options)
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
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.createStaff()
        } else {
          this.$Message.error('请按照标准输入')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style>
  .units {
    display: inline-block;
    font-size: 14px;
    line-height: 15px;
    padding: 2px;
    border: 1px solid #495060;
    border-radius: 5px;
    margin-right: 3px;
  }
</style>
