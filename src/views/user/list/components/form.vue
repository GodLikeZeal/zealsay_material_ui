<template>
    <v-dialog width="700" persistent  v-model="dialog">
        <v-card ref="row">
            <v-container fill-height fluid>
                <v-layout fill-height class="center">
                    <v-flex xs12 align-center flexbox>
                        <a href="#" title="点击修改头像">
                            <vue-initials-img class="avator" height="64" width="64"
                                              :lazy-src="form.avatar" :src="form.avatar"/>
                        </a>
                        <upload-btn outline color="indigo" title="点击修改头像"
                                    :fileChangedCallback="fileChanged"
                        >
                        </upload-btn>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-title>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                    hint="用户名不能包含空格和特殊字符"
                                    label="用户名*"
                                    v-model="form.username"
                                    validate-on-blur
                                    :rules="usernameRules"
                                    required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                    label="姓名"
                                    v-model="form.name"
                                    hint="输入真实姓名"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                    label="年龄*"
                                    v-model="form.age"
                                    persistent-hint
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Email*"
                                    v-model="form.email"
                                    type="email"
                                    required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="手机号*"
                                    v-model="form.phoneNumber"
                                    type="phone"
                                    required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    :items="sexs"
                                    :value="form.sex"
                                    item-text="text"
                                    item-value="value"
                                    item-avatar="avatar"
                                    label="性别*"
                                    required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    :items="roles"
                                    :value="form.role"
                                    item-text="text"
                                    item-value="value"
                                    label="角色"
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="darken-1" @click="handleCancel()">取消</v-btn>
                <v-btn outline :loading="loading" color="primary darken-1" @click="handleSubmit(form)">提交</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {
        addUser,
        editUser,
        uploadImage,
        getIsInUseByUsername,
        getIsInUseByPhone,
        getIsInUseByEmail
    } from "@/api/user";
    import {getRoleList} from "@/api/role";
    import UploadButton from 'vuetify-upload-button'
    export default {
        components: {
            'upload-btn': UploadButton,
        },
        name: 'edit',
        props: ['row','alert'],
        data: () => ({
            valid: true,
            name: 'edit',
            loading: false,
            file: '',
            avatar: '',
            sexs: [
                {value: 1, text: '男', avatar: '<img width="15px" src="../../../../assets/sex/boy.png"/>'},
                {value: 0, text: '女', avatar: '<img width="15px" src="../../../../assets/sex/girl.png"/>'}
            ],
            roles: [],
            usernameRules: [
                v => !!v || '用户名不能为空!',
                v => (v && v.length <= 10) || '用户名不能超过10个字符'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }),
        computed:{
          form: function () {
              return {
                  id: this.row.id,
                  age: this.row.age,
                  avatar: this.row.avatar,
                  email: this.row.email,
                  name: this.row.name,
                  phoneNumber: this.row.phoneNumber,
                  role: this.row.role,
                  sex: this.row.sex,
                  username: this.row.username
              }
          },
          dialog: {
              get: function () {
                  return this.alert;
              },
              set:function () {

              }
          }
        },
        created() {
            if (!this.roles.length) {
                getRoleList().then(res => {
                    if (res.code === '200') {
                        this.roles = res.data.map(r => {
                            return {
                                value: r.value, text: r.name
                            }

                        });
                    } else {
                        this.$dialog.notify.error("拉取角色信息失败!")
                    }
                });
            }
        },
        methods: {
            checkUsername() {
                getIsInUseByUsername({id: this.row.id, username: this.row.username}).then(res => {
                    if (res.code === '200') {
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            handleCancel(){
                this.$emit('handleCancel')
            },
            handleSubmit(obj) {
                this.loading = true;
                //先上传头像
                console.log(this.form);
                if (!(this.file === '')) {
                    let param = new FormData();
                    param.append('file', this.file);
                    uploadImage(param).then(res => {
                        if (res.code === '200') {
                            this.form.avatar = res.data;
                            //开始提交
                            editUser(this.form).then(res => {
                                if (res.code === '200' && res.data) {
                                    this.loading = false;
                                    this.$dialog.notify.info("修改成功!");
                                } else {
                                    this.$dialog.notify.error(res.message);
                                }
                            }).catch(e => {
                                this.$dialog.notify.error(e.message);
                            })
                        } else {
                            this.$dialog.notify.error(res.message);
                        }
                    }).catch(e => {
                        this.$dialog.notify.error(e.message);
                    })
                }
                // editUser(form)
            },
            fileChanged(file) {
                // handle file here. File will be an object.
                // If multiple prop is true, it will return an object array of files.
                let self = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
                if (/^image/.test(file.type)) {
                    self.file = file;
                    // 创建一个reader
                    var reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        self.row.avatar = this.result;
                    };
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .center {
        text-align: center;
    }

    .avator {
        border-radius: 50%;
    }
</style>