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
                        v-model="searchData.name"
                        placeholder="姓名"
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
                        v-model="searchData.phoneNumber"
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
                        v-model="searchData.email"
                        placeholder="邮箱"
                        solo
                ></v-text-field>
            </v-flex>
            <v-flex
                    xs6
                    sm2
                    md1
            >
                <v-btn color="info" @click="search(searchData)">搜索</v-btn>
            </v-flex>
            <v-flex
                    xs12
                    sm6
                    md1
            >
                <v-btn color="error" title="禁用"> 禁用 <br/> <v-icon small>fa-ban</v-icon></v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="desserts"
                hide-actions
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
                        <v-img :lazy-src="props.item.avatar" :src="props.item.avatar" alt="avatar"></v-img>
                    </v-avatar>
                </td>
                <td>{{ props.item.username }}</td>
                <td>{{ props.item.name }}</td>
                <td v-if="props.item.sex==1"><img width="24px" src="../../assets/sex/boy.png"/></td>
                <td v-if="props.item.sex==0"><img width="24px" src="../../assets/sex/girl.png"/></td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.email }}</td>
                <td v-if="props.item.status == 'NORMAL'" class="text-info">正常 <v-icon small>fa-plug</v-icon></td>
                <td v-if="props.item.status == 'DISABLED'" class="text-error">禁用 <v-icon small>fa-ban</v-icon></td>
                <td v-if="props.item.status == 'LOCK'" class="text-warning">锁定 <v-icon small>fa-lock</v-icon></td>
                <td>
                    <v-layout
                            justify-space-around
                            class="mb-2"
                    >
                        <v-icon title="详情" @click="handleInfo(props.item)">fa-vcard</v-icon>
                        <v-icon title="编辑" @click="handleEdit('编辑',props.item)">fa-edit</v-icon>
                        <v-icon title="禁用" @click="handleDisabled(props.item)">fa-times</v-icon>
                    </v-layout>
                </td>
            </template>
        </v-data-table>
        <div class="right pagination"><Pagination :pagination="pagination"></Pagination></div>
    </div>
</template>
<script>
    import {getUserList} from "@/api/user";
    import forms from './components/form'
    import info from './components/info'
    import Pagination from "../../components/table/Pagination";

    export default {
        name: 'User',
        components: {Pagination, forms, info},
        data() {
            return {
                searchData: {},
                headers: [
                    {
                        text: '头像',
                        value: 'avatar'
                    },
                    {
                        text: '用户名',
                        value: 'username'
                    },
                    {text: '姓名', value: 'name'},
                    {text: '性别', value: 'sex'},
                    {text: '年龄', value: 'age'},
                    {text: '邮箱', value: 'email'},
                    {text: '状态', value: 'status'},
                    {text: '操作', value: ''}
                ],
                desserts: [],
                pagination:{
                    descending: true,
                    page: 1,
                    rowsPerPage: 10, // -1 for All
                    sortBy: '',
                    totalItems: 2
                },
                row: {},
                dialogVisible: false,
                formVisible: false,
                title: ''
            };
        },
        created() {
            getUserList().then(res => {
                this.desserts = res.data.records;
                this.pagination.page = res.data.currentPage;
                this.pagination.rowsPerPage = res.data.pageSize;
                this.pagination.totalItems = res.data.total;
            });
        },
        methods: {
            search(obj) {
                getUserList(obj).then(res => {
                    this.desserts = res.data.records;
                    this.pagination.page = res.data.currentPage;
                    this.pagination.rowsPerPage = res.data.pageSize;
                    this.pagination.totalItems = res.data.total;
                });
            },
            sumForm() {
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
                this.$dialog.show(info,{row:row})
            },
            handleDisabled(row) {
                this.row = row;
                console.log(this.row);
                this.$dialog.show(info,{row:row})
            }
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

    .v-icon {
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
    .pagination {
        margin: 20px;
    }
</style>

