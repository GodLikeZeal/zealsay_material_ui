<template>
  <div class="con">
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        md3
      >
        <v-text-field
          label="Solo"
          v-model="phone"
          placeholder="手机号码"
          solo
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
      >
        <v-text-field
          label="Solo"
          v-model="email"
          placeholder="邮箱"
          solo
        ></v-text-field>
      </v-flex>
      <v-flex
        xs6
        sm2
        md2
      >
        <v-btn color="info">搜索</v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
      >
        <v-btn
          color="info"
          @click="formTrue('添加用户')"
        >添加</v-btn>
        <v-btn color="info">删除</v-btn>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>
          <v-avatar
                  size="32px"
                  color="grey lighten-4"
          >
            <img :src='props.item.avatar' alt="avatar">
          </v-avatar>
        </td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.name }}</td>
        <td v-if="props.item.sex==0"> <img width="24px" src="../../assets/sex/boy.png"/></td>
        <td v-if="props.item.sex==1"> <img width="24px" src="../../assets/sex/girl.png"/></td>
        <td>{{ props.item.age }}</td>
        <td>{{ props.item.email }}</td>
        <td v-if="props.item.status == 'NORMAL'" class="text-info">正常</td>
        <td v-if="props.item.status == 'DISABLED'" class="text-error">禁用</td>
        <td v-if="props.item.status == 'LOCK'" class="text-warning">锁定</td>
        <td>
          <v-layout
            justify-space-around
            class="mb-2"
          >
            <v-icon @click="handleInfo(props.item)">fa-vcard</v-icon>
            <v-icon @click="handleEdit('编辑',props.item)">fa-edit</v-icon>
          </v-layout>
        </td>
      </template>
    </v-data-table>


  </div>
</template>
<script>
import { getUserList } from "@/api/user";
import forms from './components/form'

export default {
    name: "User",
  components: { forms },
  data() {
    return {
      phone: "",
      email: "",
      headers: [
        {
          text: "头像",
          value: "avatar"
        },
        {
          text: "用户名",
          value: "username"
        },
        { text: "姓名", value: "name" },
        { text: "性别", value: "sex" },
        { text: "年龄", value: "age" },
        { text: "邮箱", value: "email" },
        { text: "状态", value: "status" },
        { text: "操作", value: "" }
      ],
      desserts: [],
      row: {},
      dialogVisible: false,
      formVisible: false,
      title: ""
    };
  },
  created() {
    getUserList().then(res => {
      this.desserts = res.data.records;
    });
  },
  methods: {
    succModel(){
        console.log(111)
      this.formVisible=false;
    },
    sumForm(){
      this.$refs.addForm.submitForm('ruleForm')
    },
    handleEdit(title, row) {
      this.title = title;
      if (row) {
        this.row = row;
      }
      this.formVisible = true;
      console.log(this.row);
    },
    handleInfo(row) {
      this.row = row;
      console.log(this.row);
      const res =  this.$dialog.confirm({
        text: '能弹出来让我试试吗?',
        title: 'Warning'
      })
    },
  }
};
</script>
<style lang="less" scoped>
.con {
  padding: 0 20px;
}
.layout > .flex {
  padding: 8px;
}
.v-icon{
    color: #2196f3;
    cursor: pointer;
}
.img {
  width: 30px;
  height: 30px;
}
.v-image__image {
  width: 30px;
  height: 30px;
}
.text-info {
  color: forestgreen;
  font-weight: bold;
}
.text-error {
  color: #dc6752;
  font-weight: bold;
}
.text-warning {
  color: #dca173;
  font-weight: bold;
}
</style>

