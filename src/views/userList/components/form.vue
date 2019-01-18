<template>
    <v-form :model="ruleForm"  ref="ruleForm">
        <v-container grid-list-md >
            <v-layout wrap>
                <v-flex xs12 sm8 md6>
                <v-text-field v-model="ruleForm.username" label="账户名" :rules="rules.username" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 md6>
                <v-text-field v-model="ruleForm.email" label="邮箱" :rules="rules.email" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 md6>
                <v-text-field v-model="ruleForm.phoneNumber" label="手机号码" :rules="rules.phoneNumber" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 md6>
                <v-text-field v-model="ruleForm.password" label="初始密码" :rules="rules.password" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 md6>
                    <v-select :items="items" label="角色"  v-model="ruleForm.status"></v-select>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>
<script>
import { addUser, editUser } from "@/api/user";
export default {
  props: {
    ruleForm: {
      type: Object,
      default: function() {
        return {
          password: "",
          email: "",
          phoneNumber: "",
          username: "",
          status: "ADMIN"
        };
      }
    },
    type: {
      type: Number,
      default: 1 //0添加1编辑
    }
  },
  data() {
    return {
     items:['ADMIN','NORMAL'],
      rules: {
        password: [v => !!v || '请输入初始密码',
        ],
        email: [v => !!v || '请输入邮箱'],
        phoneNumber: [
           v => !!v || '请输入手机号码'
        ],
        username: [v => !!v || '请输入昵称'],
        status: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  created(){
    //   this.$refs.ruleForm.reset()
  },
  methods: {
    submitForm(formName) {
      const POST = this.type == 0 ? addUser : editUser;
    //   this.$refs[formName].validate(valid => {
        if (this.$refs[formName].validate()) {
          POST(this.ruleForm).then(res => {
              console.log(222)
            this.$emit("sum");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
    //   });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
