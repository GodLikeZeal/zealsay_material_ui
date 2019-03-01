<template>
    <v-layout>
        <v-flex >
            <v-card>
                <v-img
                        class="white--text"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <v-img class="avator" height="64" width="64" src="https://pan.zealsay.com/d01373f082025aaf26d82daff3edab64024f1aef.jpg"></v-img>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-img>
                <v-card-title>
                    <div>
                        <span class="grey--text">21 岁</span>
                        <v-divider
                                class="mx-3"
                                inset
                                vertical
                        ></v-divider>
                        <span>男</span>
                        <v-divider
                                class="mx-3"
                                inset
                                vertical
                        ></v-divider>
                        <span>zeal</span>
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
        data () {
            return {
                card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
            }
        }
    }
</script>

<style lang="less" scoped>
    .avator {
        margin: 60px auto auto;
        border-radius: 50%;
    }
</style>