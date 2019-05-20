<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                wrap
                justify-center
        >
            <v-flex
                    xs12
                    md10
            >
                <material-card
                        color="primary"
                        title="标签云管理"
                        text="输入您要检索的标签云"
                >
                    <v-card-title class="v-card__title">
                        <v-text-field
                                v-model="search_text"
                                label="检索标签云..."
                                clear-icon="close"
                                clearable
                                type="text"
                                color="purple"
                                @click:append-outer="search"
                        >
                            <template v-slot:prepend>
                                <v-tooltip
                                        bottom
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn flat icon color="primary" @click="add">
                                            <v-icon v-on="on">add</v-icon>
                                        </v-btn>
                                    </template>
                                    没有找到？点击添加一个标签试试！
                                </v-tooltip>
                            </template>
                            <template v-slot:append-outer>
                                <v-tooltip
                                        bottom
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn flat icon color="primary" @click="search">
                                            <v-icon v-on="on">search</v-icon>
                                        </v-btn>
                                    </template>
                                    点击搜索按钮检索一下试试!
                                </v-tooltip>
                            </template>
                        </v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-chip close :color="label.outColor" text-color="white" v-for="label in labels" :key="label.id"
                                @input="remove(label.id)">
                            <v-avatar v-if="label.icon.startsWith('http')">
                                <img :src="label.icon" alt="trevor">
                            </v-avatar>
                            <v-avatar :class="label.avatarColor" v-else-if="label.icon ===''">
                                {{ label.name.charAt(0).toUpperCase() }}
                            </v-avatar>
                            <v-avatar v-else>
                                <v-icon>{{ label.icon }}</v-icon>
                            </v-avatar>
                            {{ label.name }}
                        </v-chip>
                    </v-card-text>
                </material-card>

            </v-flex>

        </v-layout>

    </v-container>

</template>

<script>
    import {getArticleLabelList, addArticleLabel, updateArticleLabel, deleteArticleLabel} from '@/api/article';

    export default {
        name: "articleLabel",
        data: () => ({
            search_text: '',
            labels: [{
                id: '1',
                icon: 'book',
                name: 'docker',
                hot: '1231',
                outColor: 'teal',
                avatarColor: 'brown'
            }, {
                id: '3',
                icon: '',
                name: 'vue',
                hot: '123',
                outColor: 'teal',
                avatarColor: 'brown'
            }, {
                id: '4',
                icon: '',
                name: 'java',
                hot: '123',
                outColor: 'teal',
                avatarColor: 'brown'
            }, {
                id: '5',
                icon: '',
                name: 'javascript',
                hot: '123',
                outColor: 'teal',
                avatarColor: 'brown'
            }, {
                id: '2',
                icon: '',
                name: 'html',
                hot: '123',
                outColor: 'teal',
                avatarColor: 'brown'
            }, {
                id: '6',
                icon: '',
                name: 'react',
                hot: '123',
                outColor: 'teal',
                avatarColor: 'brown'
            }]
        }),
        created: {

        },
        methods: {
            search() {
                console.log(this.search_text);
            },
            add() {
                console.log(this.search_text);
            },
            remove(id) {
                console.log('remove' + id);
            }
        }
    }
</script>

<style scoped>

</style>