<template>
  <div>
    <Avatar shape="square" icon="ios-person" size="large" />
    <br><br>
    <Row>
      <Col span="12">
        中文名称: {{ this.detaildata.chnName}}
      </Col>
      <Col span="12">
        英文名称: {{ this.detaildata.engName}}
      </Col>
      <br>
    </Row>
    <br><br>
    <Row>
      <Col span="12">
        员工性别:
        <span v-if="this.detaildata.gender === 0">未知</span>
        <span v-else-if="this.detaildata.gender === 1">男</span>
        <span v-else-if="this.detaildata.gender === 2">女</span>
      </Col>
      <Col span="12">
        手机号码: {{ this.detaildata.mobile}}
      </Col>
    </Row>
    <br><br>
    <Row>
      <Col span="12">
        座机号码: {{ this.detaildata.telephone}}
      </Col>
      <Col span="12">
        身份证号码:{{ this.detaildata.idCard}}
      </Col>

    <br>
      <br>
      <br>
      <Col span="12">
        邮箱号码: {{ this.detaildata.email}}
      </Col>

      <br>
      <br>
      <br>
      <Col span="12">
        详细地址: {{ this.detaildata.address}}
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span="12">
        职务: {{ this.detaildata.title}}
      </Col>
      <!--部门和主岗对应起来，用字符串截取分割成数组，下标对应-->
      <Col span="12">
        部门: {{ this.detaildata.unitName}}
      </Col>
      <br><br><br>

      <Col span="24">
      </Col>

      <Col span="12">
        员工类型:
        <span v-if="this.detaildata.staffType === 2">正式员工</span>
        <span v-else-if="this.detaildata.staffType === 4">外包员工</span>
        <span v-else-if="this.detaildata.staffType===6">合作伙伴</span>
        <span v-else-if="this.detaildata.staffType===0">未知</span>
      </Col>

    </Row>
  </div>

</template>

<script>
export default {
  name: 'detailPage',
  props: ['detaildata'],
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
    }

  }

}
</script>

<style scoped>

</style>
