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
                                       src="https://pan.zealsay.com/d01373f082025aaf26d82daff3edab64024f1aef.jpg"></v-img>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
                <v-card-title>
                    <div class="row center">
                        <span class="teal--text xs4">{{ row.age }} 岁</span>
                        <v-divider
                                class="mx-3"
                                dark
                                inset
                                vertical
                        ></v-divider>
                        <span class="xs4">男</span>
                        <v-divider
                                class="mx-3"
                                dark
                                inset
                                vertical
                        ></v-divider>
                        <span class="xs4">zeal</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
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
                        age:'',
                        sex:''
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
</style>