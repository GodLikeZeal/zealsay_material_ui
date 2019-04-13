<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="con">
        <v-layout
                row
                wrap
                fill-height
                justify-end
        >
            <v-flex
                    xs6
                    sm3
                    md1
            >
                <v-btn color="success" title="添加" @click="handleAdd()"> 添加 <br/>
                    <v-icon small>add_circle</v-icon>
                </v-btn>
            </v-flex>
            <v-flex
                    xs6
                    sm3
                    md1
            >
                <v-btn color="error" title="删除" @click="handleDeleteSelected(selected)"> 删除 <br/>
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
                    <td class="text-xs-center" @click="props.selected = !props.selected">
                        <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                        ></v-checkbox>
                    </td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.value }}</td>
                    <td class="text-xs-center">{{ props.item.description }}</td>
                    <td class="text-xs-center">
                        <v-layout
                                justify-center
                                class="mb-2"
                        >
                            <v-btn icon flat color="primary" title="编辑" @click="handleEdit(props.item)">
                                <v-icon>create</v-icon>
                            </v-btn>
                            <v-btn icon flat color="primary" title="删除" @click="handleDelete(props.item)">
                                <v-icon>remove_circle</v-icon>
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
            <forms :row="row" :alert="formVisible" @handleCancel='handleCancel'></forms>
        </div>
    </div>
</template>
<script>
    import {getRolePageList,addRole,updateRole,deleteRole,deleteRoleBatch} from "@/api/role";
    import forms from './components/form'
    import Pagination from "../../../components/table/Pagination";

    export default {
        name: 'User',
        components: {Pagination, forms},
        data() {
            return {
                searchData: {},
                selected: [],
                loading: true,
                headers: [
                    {text: '名称', value: 'name'},
                    {text: 'VALUE', value: 'value'},
                    {text: '功能描述', value: 'description'},
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
            getRolePageList().then(res => {
                this.desserts = res.data.records;
                this.pagination.page = res.data.currentPage;
                this.pagination.rowsPerPage = res.data.pageSize;
                this.pagination.totalItems = res.data.total;
                this.loading = false;
            });
        },
        methods: {
            refresh(obj) {
                getRolePageList(obj).then(res => {
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
            handleCancel() {
                this.formVisible = false;
            },
            handleAdd() {
                this.$swal({
                    title: '添加用户!',
                    text: '该用户已经被封禁',
                    type: 'success'
                });
            },
            handleEdit(row) {
                this.formVisible = true;
                this.row = {...row};
            },
            handleDelete(row) {
                this.$swal({
                    title: '删除用户!',
                    text: '该用户已经被封禁',
                    type: 'success'
                });
            },
            handleDeleteSelected() {
                this.$swal({
                    title: '批量删除用户!',
                    text: '该用户已经被封禁',
                    type: 'success'
                });
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

    .text-success {
        color: forestgreen;
        font-weight: bold;
        padding: 0 12px !important;
    }

    .text-error {
        color: #dc6752;
        font-weight: bold;
        padding: 0 12px !important;
    }

    .text-warning {
        color: #dca173;
        font-weight: bold;
        padding: 0 12px !important;
    }

    .pagination {
        margin: 20px;
    }

</style>

