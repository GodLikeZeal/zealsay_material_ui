<template>
    <v-card>
        <v-container fill-height fluid>
            <v-layout fill-height class="center" >
                <v-flex xs12 align-center flexbox>
                    <a href="#" title="点击修改头像">
                        <vue-initials-img class="avator"  height="64" width="64" :name="row.username" :lazy-src="row.avatar" :src="row.avatar" />
                    </a>
                    <p xs4 align="center">点击修改头像</p>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card-title>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field hint="用户名不能包含空格和特殊字符" label="用户名*" v-model="row.username" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="姓名" v-model="row.name" hint="输入真实姓名"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                                label="年龄*"
                                v-model="row.age"
                                persistent-hint
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Email*" v-model="row.email" type="email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="手机号*" v-model="row.phoneNumber" type="phone" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                                :items="sexs"
                                item-text="text"
                                item-value="value"
                                :value="row.sex"
                                label="性别*"
                                required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-autocomplete
                                :items="['管理员', '作者', '访客']"
                                label="角色"
                        ></v-autocomplete>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-title>
        <v-card-text>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline color="darken-1" @click="dialog = false">取消</v-btn>
            <v-btn outline color="primary darken-1" @click="dialog = false">提交</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { addUser, editUser } from "@/api/user";
import UploadButton from 'vuetify-upload-button'
export default {
    components: {
        'upload-btn': UploadButton
    },
    name:'edit',
    props: {
        row: {
            type: Object,
            default: function () {
                return {
                    address: "",
                    age: 23,
                    area: '',
                    avatar: "",
                    city: "",
                    deptId: "",
                    email: "",
                    label: "",
                    lastPasswordResetDate: "",
                    name: "",
                    phoneNumber: "",
                    registerAt: "",
                    roleId: "",
                    sex: 0,
                    status: "",
                    username: ""
                }
            }
        }
    },
    data: () => ({
        valid: true,
        name: '',
        sexs:[
            {value:1,text:'男'},
            {value:0,text:'女'}
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
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

    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        fileChanged (file) {
            // handle file here. File will be an object.
            // If multiple prop is true, it will return an object array of files.
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