<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="头像" prop="avatarId">
      <Upload action="" ref="upload" style="width: 50px;" :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :max-size="2048" type="drag">
        <div>
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="中文名称" prop="chnName">
      <Input v-model="formValidate.chnName" placeholder="this.detaildata.unitName" style="width: 80%"></Input>
    </FormItem>
    <FormItem label="英文名称" prop="engName">
      <Input v-model="formValidate.engName" placeholder="Enter your name" disabled style="width: 80%"></Input>
    </FormItem>
    <FormItem label="员工性别:" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio v-for="item in sexList" :key="item.value" :label="item.value" disabled>{{item.label}}</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="主岗机构:" prop="unitId">
      <Icon v-show="isShow" style="font-size: 18px;" @click="selectUnit" type="md-add"/>
      <span  class="units" @click="selectUnit" v-for="(item,index) in staffUnits" :key="index" :class="item.isMain==1?'isMain':''">
            {{item.title}}
          </span>
    </FormItem>
    <FormItem label="员工类型:" prop="staffType" style="width: 80%">
      <Select v-model="formValidate.staffType">
        <Option v-for="item in staffTypeList" :key="item.label" :value="item.value" disabled>{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="联系电话" prop="mobile">
      <Input v-model="formValidate.mobile" placeholder="Enter your name" style="width: 80%" disabled></Input>
    </FormItem>
    <FormItem label="身份证号" prop="idCard">
      <Input v-model="formValidate.idCard" placeholder="Enter your name" style="width: 80%" disabled></Input>
    </FormItem>
    <FormItem label="固定电话" prop="telephone">
      <Input v-model="formValidate.telephone" placeholder="Enter your name" style="width: 80%"/></Input>
    </FormItem>
    <FormItem label="联系邮箱" prop="email">
      <Input v-model="formValidate.email" placeholder="Enter your e-mail" style="width: 80%"></Input>
    </FormItem>
    <FormItem label="联系地址" prop="address">
      <Input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="Enter something..." style="width: 85%"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>

    </FormItem>
  </Form>
</template>
<script>
import checkboxTree from '../tree/CheckboxTree'
// eslint-disable-next-line no-unused-vars
import { forEach } from '../../../libs/tools'

export default {

  name: 'detailPage',
  components: { checkboxTree },
  props: {
    formValidate: Object
  },
  data () {
    return {
      staffUnits: [],
      // 是否单选
      isRadio: false,
      options: {
        emulateJSON: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8;',
          id: '1',
          name: 'dz'
        }
      },
      staffUnitIds: [],
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
      ruleValidate: {
        chnName: [
          { required: true, message: '中文名不能为空', trigger: 'blur' }
        ],
        engName: [
          { required: true, message: '中文名不能为空', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '不正确的电子邮件格式', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择员工性别', trigger: 'change' }
        ],
        unitId:
            [
              { required: true, type: 'number', message: '主岗不能为空', trigger: 'change' }
            ],
        idCard:
            [
              { required: true, message: '身份证号不能为空', trigger: 'blur' }
            ],
        staffType:
            [
              { required: true, type: 'number', message: '员工类型不能为空', trigger: 'change' }
            ],
        mobile:
            [
              { required: true, message: '联系电话不能为空', trigger: 'blur' },
              { pattern: '^[1][3,4,5,7,8][0-9]{9}$', message: '联系电话格式错误', trigger: 'blur' }
            ]

      }
    }
  },
  mounted () {

  },
  computed: {
    isShow () {
      if (this.staffUnits.length === 0 || !this.isRadio) {
        return true
      }
      return false
    }
  },
  watch: {
    formValidate (newV) {
      this.staffUnits = []
      let mains = newV.isMain.split(';')
      let unitIds = newV.unitId.split(';')
      let unitNames = newV.unitName.split(';')
      let unitFullNames = newV.unitFullName.split(';')
      for (let i = 0; i < mains.length; i++) {
        let staffUnit = {}
        staffUnit.id = unitIds[i]
        staffUnit.isMain = mains[i]
        staffUnit.title = unitNames[i]
        staffUnit.fullName = unitFullNames[i]

        this.staffUnits.push(staffUnit)
      }
    }
  },
  methods: {
    handleSubmit () {
      this.staffUnitIds = []
      this.staffUnits.forEach(item => {
        this.staffUnitIds.push(item.id)
      })

      let updateData = {
        staffId: this.formValidate.id,
        chnName: this.formValidate.chnName,
        address: this.formValidate.address,
        email: this.formValidate.email,
        telephone: this.formValidate.telephone,
        avatarId: this.formValidate.avatarId,
        staffUnitIds: this.staffUnitIds
      }
      this.$http
        .post('/api/pc/staff/updateStaff', updateData, this.options)
        .then(function (response) {
          if (response.body.ret === 1) {
            this.$Message.error('修改失败')
          } else {
            this.$Message.success('修改成功')
            this.$emit('isShowModal', '')
          }
        })
    },
    selectUnit () {
      let that = this
      this.$Modal.confirm({
        width: 800,
        title: '选择机构',
        render: h => {
          return h(checkboxTree, {
            props: {
              selectedUnits: that.staffUnits,
              isRadio: that.isRadio,
              readOnly: true
            },
            on: {
              getUnits: (units) => {
                that.staffUnits = units
              }
            }
          })
        }
      })
    }
  }
}
</script>
<style>
  .isMain{
    border-color: #ed4014 !important;
  }

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
