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
          <v-layout>
            <v-img
              :src='props.item.avatar'
              class="img"
              width='30'
              height='30'
              contain
            ></v-img>
          </v-layout>
        </td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.age }}</td>
        <td>{{ props.item.sex==0?'男':'女' }}</td>
        <td>{{ props.item.status }}</td>
        <td>
          <v-layout
            justify-space-around
            class="mb-2"
          >
            <v-icon blue @click="handleClick(props.item)">info</v-icon>
            <v-icon @click="formTrue('编辑',props.item)">fa-edit</v-icon>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialogVisible"
      width="500"
    >
      <v-card>
        <v-card-title
        >
          <span class="headline">账户详情</span>
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialogVisible = false"
          >
            YES
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="formVisible" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <forms ref='addForm' :sum='succModel' :ruleForm="row" :type='title=="编辑"?1:0'></forms>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="formVisible=false">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="sumForm">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
        { text: "邮箱", value: "email" },
        { text: "年龄", value: "age" },
        { text: "性别", value: "sex" },
        { text: "status", value: "status" },
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
    formTrue(title, row) {
      this.title = title;
      if (row) {
        this.row = row;
      }
      this.formVisible = true;
      console.log(this.row);
    },
    handleClick(row) {
      this.row = row;
      this.dialogVisible = true;
      console.log(this.row);
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
</style>

