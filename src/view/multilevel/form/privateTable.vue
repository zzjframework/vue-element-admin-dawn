<style>

</style>

<template>
  <div>
      <Table border :columns="historyColumns" :data="historyData" size="small" >
        <template slot-scope="{ row, index }" slot="action">
          <template>
            <Button @click="modal11 = true" type="primary" shape="circle" size="small">详情</Button>
          </template>
            <Button @click="modal12 = true" type="info" shape="circle" size="small" style="margin-left:5px;"v-on:click="updateStaff()">
              修改
            </Button>
          <!--删除-->
            <Button type="error" @click="modaldeleteStaff = true" shape="circle" size="small" style=" margin-left:5px;">删除</Button>
            <Modal
              v-model="modaldeleteStaff"
              title="删除操作"
              @on-ok="deleteStaff(row)">
              <p>您确定删除该条员工信息吗？</p>
            </Modal>
        </template>
      </Table>
      </div>
</template>

<script >
  export default {
    name: "addStaff",
    components: {},
    data() {
      return {
        historyData: [],
        historyColumns: [
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "职务",
            key: "title"
          },
          {
            title: "部门",
            key: "units",
            sortable: true
          },
          {
            title: "手机",
            key: "mobile"
          },
          {
            title: "邮箱",
            key: "email"
          },
          {
            title: "操作",
            slot: "action",
            width: 200,
            align: "center"
          }
        ],

      }


      },

    methods: {

    }
  };

</script>


