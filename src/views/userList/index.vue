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
                <v-btn color="info" @click="search(searchData)">搜索 <br/>
                    <v-icon small>search</v-icon>
                </v-btn>
            </v-flex>
            <v-flex
                    xs6
                    sm2
                    md1
            >
                <v-btn color="success" title="解封" @click="handleUnsealingSelected(selected)"> 解封 <br/>
                    <v-icon small>how_to_reg</v-icon>
                </v-btn>
            </v-flex>
            <v-flex
                xs6
                sm2
                md1
            >
                <v-btn color="error" title="禁用" @click="handleDisabledSelected(selected)"> 封禁 <br/>
                    <v-icon small>fa-ban</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :pagination.sync="pagination"
                :items="desserts"
                :loading="loading"
                hide-actions
                select-all
                class="elevation-1"
        >
            <template v-slot:headers="props">
                <tr>
                    <th>
                        <v-checkbox
                                :input-value="props.all"
                                :indeterminate="props.indeterminate"
                                primary
                                hide-details
                                @click.stop="toggleAll"
                        ></v-checkbox>
                    </th>
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
            </template>
            <template
                    slot="items"
                    slot-scope="props"
            >
                <tr :active="props.selected">
                    <td @click="props.selected = !props.selected">
                        <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                        ></v-checkbox>
                    </td>
                    <td class="text-xs-right">
                        <v-avatar
                                size="32px"
                                color="grey lighten-4"
                        >
                            <v-img :lazy-src="props.item.avatar" :src="props.item.avatar" alt="avatar"></v-img>
                        </v-avatar>
                    </td>
                    <td class="text-xs-right">{{ props.item.username }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right" v-if="props.item.sex==1"><img width="24px"
                                                                            src="../../assets/sex/boy.png"/></td>
                    <td class="text-xs-right" v-if="props.item.sex==0"><img width="24px"
                                                                            src="../../assets/sex/girl.png"/></td>
                    <td class="text-xs-right">{{ props.item.age }}</td>
                    <td class="text-xs-right">{{ props.item.phoneNumber }}</td>
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right text-info"  v-if="props.item.status == 'NORMAL'">正常
                        <v-icon color="success" small>fa-plug</v-icon>
                    </td>
                    <td class="text-xs-right text-error" v-if="props.item.status == 'DISABLED'">封禁
                        <v-icon color="error" small>fa-ban</v-icon>
                    </td>
                    <td class="text-xs-right text-warning" v-if="props.item.status == 'LOCK'">锁定
                        <v-icon color="warning" small>fa-lock</v-icon>
                    </td>
                    <td class="text-xs-right">
                        <v-layout
                                justify-center
                                class="mb-2"
                        >
                                <v-btn icon flat color="primary" title="详情" @click="handleInfo(props.item)">
                                    <v-icon>portrait</v-icon>
                                </v-btn>
                                <v-btn icon flat color="primary" title="编辑" @click="handleEdit(props.item)">
                                    <v-icon >create</v-icon>
                                </v-btn>
                                <v-btn icon flat color="primary" title="解封" @click="handleUnsealing(props.item)">
                                    <v-icon >how_to_reg</v-icon>
                                </v-btn>
                                <v-btn icon flat color="primary" title="封禁" @click="handleDisabled(props.item)">
                                    <v-icon >remove_circle</v-icon>
                                </v-btn>
                        </v-layout>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div class="right pagination">
            <Pagination :pagination="pagination"></Pagination>
        </div>
        <div>
            <forms :row="row" :dialog="formVisible"></forms>
        </div>
    </div>
</template>
<script>
    import {getUserList, disabeledUser, disabeledUserBatch,unsealingUserBatch,unsealingUser} from "@/api/user";
    import forms from './components/form'
    import info from './components/info'
    import Pagination from "../../components/table/Pagination";

    export default {
        name: 'User',
        components: {Pagination, forms, info},
        data() {
            return {
                searchData: {},
                selected: [],
                loading: true,
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
                    {text: '手机号', value: 'phoneNumber'},
                    {text: '邮箱', value: 'email'},
                    {text: '状态', value: 'status'},
                    {text: '操作', value: ''}
                ],
                desserts: [],
                pagination: {
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
                this.loading = false;
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
            toggleAll() {
                if (this.selected.length) this.selected = [];
                else this.selected = this.desserts.slice()
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column;
                    this.pagination.descending = false
                }
            },
            handleEdit(row) {
                this.formVisible = true;
                // let editDialog = this.$dialog.show(forms, {
                //     row: row,
                //     width: 600
                // });
            },
            handleInfo(row) {
                this.$dialog.show(info, {row: row})
            },
            handleDisabled(row) {
                this.$dialog.error({
                    title: '操作提示',
                    text: '确认要封禁吗？',
                    actions: {
                        false: '取消',
                        true: {
                            text: '确认',
                            color: 'error',
                            handle: () => {
                                disabeledUser(row.id).then(res => {
                                    if (res.code === '200' && res.data) {
                                        this.$dialog.warning({
                                            title: '操作提示',
                                            text: '操作成功！',
                                            actions: {
                                                false: {
                                                    text: '取消',
                                                    handle: () => {
                                                        this.search('');
                                                    }
                                                },
                                                true: {
                                                    text: '确定',
                                                    color: 'warning',
                                                    handle: () => {
                                                        this.search('');
                                                    }
                                                }
                                            }
                                        });
                                    } else {
                                        this.$dialog.error({
                                            title: '操作提示',
                                            text: res.message
                                        })
                                    }
                                });
                            }
                        }
                    }
                })
            },
            handleUnsealing(row) {
                unsealingUser(row.id).then(res => {
                    if (res.code === '200' && res.data) {
                        this.$dialog.warning({
                            title: '操作提示',
                            text: '操作成功！',
                            actions: {
                                false: {
                                    text: '取消',
                                    handle: () => {
                                        this.search('');
                                    }
                                },
                                true: {
                                    text: '确定',
                                    color: 'warning',
                                    handle: () => {
                                        this.search('');
                                    }
                                }
                            }
                        });
                    } else {
                        this.$dialog.error({
                            title: '操作提示',
                            text: res.message
                        })
                    }
                });
            },
            handleDisabledSelected(selected) {
                let param = selected.map(s => s.id);
                if (param.length > 0) {
                    this.$dialog.error({
                        title: '操作提示',
                        text: '确认要封禁吗？',
                        actions: {
                            false: '取消',
                            true: {
                                text: '确认',
                                color: 'error',
                                handle: () => {
                                    disabeledUserBatch(param).then(res => {
                                        if (res.code === '200' && res.data) {
                                            this.$dialog.warning({
                                                title: '操作提示',
                                                text: '操作成功！',
                                                actions: {
                                                    false: {
                                                        text: '取消',
                                                        handle: () => {
                                                            this.search('');
                                                        }
                                                    },
                                                    true: {
                                                        text: '确定',
                                                        color: 'warning',
                                                        handle: () => {
                                                            this.search('');
                                                        }
                                                    }
                                                }
                                            });
                                        } else {
                                            this.$dialog.error({
                                                title: '操作提示',
                                                text: res.message
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    })
                } else {
                    this.$dialog.error({
                        title: '操作提示',
                        text: '请至少选择一条需要封禁的用户！'
                    })
                }
            },
            handleUnsealingSelected(selected) {
                let param = selected.map(s => s.id);
                if (param.length > 0) {
                        unsealingUserBatch(param).then(res => {
                            if (res.code === '200' && res.data) {
                                this.$dialog.warning({
                                    title: '操作提示',
                                    text: '操作成功！',
                                    actions: {
                                        false: {
                                            text: '取消',
                                            handle: () => {
                                                this.search('');
                                            }
                                        },
                                        true: {
                                            text: '确定',
                                            color: 'warning',
                                            handle: () => {
                                                this.search('');
                                            }
                                        }
                                    }
                                });
                            } else {
                                this.$dialog.error({
                                    title: '操作提示',
                                    text: res.message
                                })
                            }
                        })
                } else {
                    this.$dialog.error({
                        title: '操作提示',
                        text: '请至少选择一条需要封禁的用户！'
                    })
                }
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
        padding: 0 12px!important;
    }

    .text-error {
        color: #dc6752;
        font-weight: bold;
        padding: 0 12px!important;
    }

    .text-warning {
        color: #dca173;
        font-weight: bold;
        padding: 0 12px!important;
    }

    .pagination {
        margin: 20px;
    }
</style>

