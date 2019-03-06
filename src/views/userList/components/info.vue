<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-img
                        class="white--text"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <v-img class="avator" height="64" width="64"
                                       :lazy-src="row.avatar" :src="row.avatar"></v-img>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
                <v-card-title>
                    <div class="row center">
                        <span class="indigo--text text-detail">{{ row.age }} 岁</span>
                        <span class="text-detail" v-if="row.sex==1" title="男"><img width="15px" src="../../../assets/sex/boy.png"/></span>
                        <span class="text-detail" v-if="row.sex==0" title="女"><img width="15px" src="../../../assets/sex/girl.png"/></span>
                        <span class="indigo--text text-detail">{{ row.username }}</span>
                    </div>
                    <v-card-text>
                        <p class="grey--text"> <span class="text-detail">姓名 ：{{ row.name }}</span>  <span>城市：{{ row.city ? row.city : "暂无"}}</span>  <span class="text-detail">注册于：{{ row.registerAt }} </span></p>
                        <p v-if="row.phoneNumber" ><span class="text-detail grey--text">手机号 ：{{ row.phoneNumber }}</span> <v-icon small color="success"> fa-check-circle</v-icon><span  class="green--text"> 已绑定</span></p>
                        <p v-else><span class="text-detail grey--text">手机号 ：无</span> <v-icon small color="warning"> fa-exclamation-circle</v-icon><span  class="orange--text"> 未绑定</span></p>
                        <p v-if="row.email" ><span class="text-detail grey--text">邮 箱 ：{{ row.email }}</span> <v-icon small color="success"> fa-check-circle</v-icon><span  class="green--text"> 已绑定</span></p>
                        <p v-else><span class="text-detail grey--text">邮 箱 ：无</span> <v-icon small color="warning"> fa-exclamation-circle</v-icon><span  class="orange--text"> 未绑定</span></p>
                        <p class="grey--text"><span class="text-detail">地址 ：{{ row.address ? row.address : "无" }}</span></p>
                    </v-card-text>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "info",
        props: {
            row:{
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
        data() {
            return {
                age: 12,
                sex: '男'
            }
        }
    }
</script>

<style lang="less" scoped>
    .avator {
        margin: 60px auto auto;
        border-radius: 50%;
    }

    .center {
        margin: 0 auto;
    }
    .text-detail {
        margin: 0 15px;
    }
</style>