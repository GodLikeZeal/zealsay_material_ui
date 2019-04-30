<template>
    <v-container
            fill-height
            fluid
            grid-list-xl>
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    xs12
                    md3
            >
                <material-card class="v-card-profile">
                    <v-flex xs12 md12>
                        <v-img
                                class="avator"
                                ref="img"
                                :src="image"
                        />
                    </v-flex>
                    <v-card-text class="text-xs-center">
                        <h6 class="category text-gray ffont-weight-light mb-3">封面图片</h6>
                        <h5 class="card-title font-weight-light">Some of us get dipped in flat, some in satin, some
                            in
                            gloss.... But every once in a while you find someone who's iridescent, and when you do,
                            nothing will ever compare.</h5>
                        <p class="card-description font-weight-light">
                            有人住高楼，有人在深沟，有人光万丈，有人一身锈，世人万千种，浮云莫去求，斯人若彩虹，遇上方知有。</p>
                        <upload-btn
                                class="font-weight-light"
                                color="primary"
                                title="上传封面"
                                round
                                :fileChangedCallback="fileChanged"
                        >
                        </upload-btn>
                    </v-card-text>
                </material-card>
            </v-flex>
            <v-flex
                    xs12
                    md8
            >
                <material-card
                        color="primary"
                        title="文章基本信息"
                        text="完善文章信息后，点击提交"
                >
                    <v-form ref="form" lazy-validation>
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex
                                        xs12
                                        md12
                                >
                                    <v-text-field
                                            v-model="form.title"
                                            :rules="utitleRules"
                                            hint="标题不能包含空格和特殊字符,不超过20个字符"
                                            class="purple-input"
                                            label="标题*"
                                            required
                                    />
                                </v-flex>
                                <v-flex
                                        xs12
                                        md12
                                >
                                    <v-text-field
                                            v-model="form.subheading"
                                            :rules="subheadingRules"
                                            hint="副标题不能超过30个字符"
                                            class="purple-input"
                                            label="副标题*"
                                            required
                                    />
                                </v-flex>
                                <v-flex
                                        xs12
                                        md6
                                >
                                    <v-select
                                            v-model="form.categoryId"
                                            :items="category"
                                            item-text="text"
                                            item-value="value"
                                            label="分类目录*"
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md6
                                >
                                    <v-select
                                            attach
                                            chips
                                            multiple
                                            :items="labels"
                                            v-model="form.label"
                                            label="标签"
                                            class="purple-input">
                                    </v-select>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md12
                                >
                                    <v-radio-group v-model="form.openness" row label="公开度">
                                        <v-radio label="仅自己可阅读" value="radio-1"></v-radio>
                                        <v-radio label="所有人可阅读" value="radio-3"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md12>
                                    <v-radio-group v-model="form.status" row label="状 态">
                                        <v-radio label="草稿" value="radio-1"></v-radio>
                                        <v-radio label="发布" value="radio-2"></v-radio>
                                    </v-radio-group>
                                </v-flex>

                                <v-flex
                                        xs12
                                        text-xs-center
                                >
                                    <v-btn
                                            round
                                            class="font-weight-light"
                                            color="primary"
                                            :loading="loading"
                                            @click="submit()"
                                    >
                                        添加保存
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </material-card>
            </v-flex>
            <v-flex
                    xs12
                    md11>
                <material-card
                        color="primary"
                        title="编辑文章详细内容"
                        text="支持使用markdown语法"
                >
                    <mavon-editor ref=md :ishljs = "true" @change="changeData" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="form.contentMd"/>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {addUser, uploadImage,uploadImageMultiple} from "@/api/user";
    import {getCategoryList} from '@/api/article';
    import {getRoleList} from "@/api/role";
    import {validateUsername, validatePassword, validatePhone, validateEmail} from "@/util/validate";
    import UploadButton from 'vuetify-upload-button';

    export default {
        name: 'add',
        components: {
            'upload-btn': UploadButton,
        },
        data: () => ({
            form: {
                title: '',
                subheading: '',
                status: '',
                coverImage: 'https://pan.zealsay.com/20190317010254129000000.jpg',
                label: '',
                openness: '',
                contentMd: '',
                contentHtml: ''
            },
            img_file: {},
            valid: false,
            image: 'https://pan.zealsay.com/20190317010254129000000.jpg',
            category: [],
            labels: ['docker','java','vue','javascript','动漫','杂谈','评点'],
            categoryLoading: false,
            cityLoading: false,
            areaLoading: false,
            file: '',
            loading: false,
            utitleRules: [
                v => !!v || '标题不能为空!',
                v => (v && v.length <= 20) || '标题不得超过20个字符',
                v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
            ],
            subheadingRules: [
                v => (v && v.length <= 30) || '副标题不得超过30个字符'
            ]
        }),
        created() {
            this.categoryLoading = true;
            getCategoryList().then(res => {
                if (res.code === '200') {
                    this.category = res.data.map(r => {
                        return {
                            value: r.id, text: r.name
                        }
                    });
                } else {
                    this.$dialog.notify.error("拉取分类目录信息失败!")
                }
                this.categoryLoading = false;
            });
        },
        methods: {
            submit() {
                this.loading = true;
                this.uploadimg();
                this.loading = false;
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
                        self.$refs.img.src = this.result;
                        self.form.coverImage = this.result;
                    };
                }

            },
            changeData(value, render) {
                this.form.contentHtml = render;
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file){
                // 缓存图片信息
                this.img_file[pos] = $file;
            },
            $imgDel(pos){
                delete this.img_file[pos[1]];
            },
            uploadimg($e){
                // 第一步.将图片上传到服务器.
                if (JSON.stringify(this.img_file) != '{}') {
                    var formdata = new FormData();
                    for(var _img in this.img_file){
                        formdata.append('files' , this.img_file[_img] ,_img);
                    }
                    uploadImageMultiple(formdata).then(res => {
                        if (res.code === '200') {
                            for (var img in res.data) {
                                // $vm.$img2Url 详情见本页末尾
                                this.$refs.md.$img2Url(res.data[img].pos, res.data[img].url);
                            }
                            console.log(this.form);
                        } else {
                            this.loading = false;
                            this.$swal({
                                text: res.message,
                                type: 'error',
                                toast: true,
                                position: 'top',
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                    }).catch(e => {
                        console.log(e);
                        this.loading = false;
                        // this.$swal({
                        //     text: e.message,
                        //     type: 'error',
                        //     toast: true,
                        //     position: 'top',
                        //     showConfirmButton: false,
                        //     timer: 3000
                        // });
                    });
                } else {
                    console.log( this.form);
                }

            }
        },
    }
</script>
<style lang="less" scoped>
    .avator {
        margin: 0px auto;
    }
</style>