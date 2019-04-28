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
                                            v-model="form.username"
                                            :rules="usernameRules"
                                            hint="用户名不能包含空格和特殊字符"
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
                                            v-model="form.password"
                                            :rules="passwordRules"
                                            hint="密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
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
                                            v-model="form.role"
                                            :items="roles"
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
                                            v-model="form.phoneNumber"
                                            :rules="phoneRules"
                                            label="标签*"
                                            class="purple-input">
                                    </v-select>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md12
                                >
                                    <v-radio-group v-model="form.email" row label="公开度">
                                        <v-radio label="仅自己可阅读" value="radio-1"></v-radio>
                                        <v-radio label="关注可阅读" value="radio-2"></v-radio>
                                        <v-radio label="所有人可阅读" value="radio-3"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md12>
                                    <v-radio-group v-model="form.email" row label="状态">
                                        <v-radio label="草稿" value="radio-1"></v-radio>
                                        <v-radio label="发布" value="radio-2"></v-radio>
                                        <v-radio label="取消发布" value="radio-3"></v-radio>
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
                    <mavon-editor :ishljs = "true" v-model="handbook"/>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {addUser, uploadImage} from "@/api/user";
    import {getProvinceList, getCityList, getAreaList} from '@/api/dict';
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
                username: '',
                password: '',
                name: '',
                avatar: 'https://pan.zealsay.com/20190317010254129000000.jpg',
                phoneNumber: '',
                email: '',
                province: '',
                city: '',
                area: '',
                adrress: '',
                introduction: '',
                role: '',
            },
            valid: false,
            image: 'https://pan.zealsay.com/20190317010254129000000.jpg',
            roles: [],
            province: [],
            city: [],
            area: [],
            provinceLoading: false,
            cityLoading: false,
            areaLoading: false,
            file: '',
            loading: false,
            usernameRules: [
                v => !!v || '用户名不能为空!',
                v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
            ],
            passwordRules: [
                v => !!v || '密码不能为空!',
                v => validatePassword(v) || '必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
            ],
            phoneRules: [
                v => !!v || '手机号不能为空!',
                v => validatePhone(v) || '不是合法的手机号'
            ],
            emailRules: [
                v => (!v || validateEmail(v)) || '不是合法的邮箱'
            ],
            handbook: "#### how to use mavonEditor in nuxt.js"
        }),
        created() {
            this.provinceLoading = true;
            getProvinceList().then(res => {
                if (res.code === '200') {
                    this.province = res.data.map(r => {
                        return {
                            value: r.code, text: r.name
                        }
                    });
                } else {
                    this.$dialog.notify.error("拉取省市区信息失败!")
                }
                this.provinceLoading = false;
            });
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
            changeProvince() {
                this.cityLoading = true;
                let obj = {};
                obj.code = this.form.province;
                getCityList(obj).then(res => {
                    if (res.code === '200') {
                        this.city = res.data.map(r => {
                            return {
                                value: r.code, text: r.name
                            }
                        });
                    } else {
                        this.$swal({
                            text: '拉取省市区信息失败!',
                            type: 'error',
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                    this.cityLoading = false;
                });
            },
            changeCity() {
                this.areaLoading = true;
                let obj = {};
                obj.code = this.form.city;
                getAreaList(obj).then(res => {
                    if (res.code === '200') {
                        this.area = res.data.map(r => {
                            return {
                                value: r.code, text: r.name
                            }
                        });
                    } else {
                        this.$swal({
                            text: '拉取省市区信息失败!',
                            type: 'error',
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                    this.areaLoading = false;
                });
            },
            submit() {
                this.loading = true;
                if (this.$refs.form.validate()) {
                    //先上传头像
                    if (!(this.file === '') && !(this.image === 'https://pan.zealsay.com/20190317010254129000000.jpg')) {
                        let param = new FormData();
                        param.append('file', this.file);
                        uploadImage(param).then(res => {
                            if (res.code === '200') {
                                this.form.avatar = res.data;
                                //开始提交
                                addUser(this.form).then(res => {
                                    this.loading = false;
                                    if (res.code === '200' && res.data) {
                                        this.$swal({
                                            title: '添加成功!',
                                            text: '您已经成功添加了一名用户',
                                            type: 'success'
                                        });
                                    } else {
                                        this.$swal({
                                            title: '添加失败!',
                                            text: res.message,
                                            type: 'error'
                                        });
                                    }
                                }).catch(e => {
                                    this.loading = false;
                                    this.$swal({
                                        text: e.message,
                                        type: 'error',
                                        toast: true,
                                        position: 'top',
                                        showConfirmButton: false,
                                        timer: 3000
                                    });
                                })
                            } else {
                                this.$swal({
                                    title: '添加失败!',
                                    text: res.message,
                                    type: 'error'
                                });
                            }
                        }).catch(e => {
                            this.loading = false;
                            this.$swal({
                                text: e.message,
                                type: 'error',
                                toast: true
                            });
                        })
                    }
                    //开始提交
                    addUser(this.form).then(res => {
                        this.loading = false;
                        if (res.code === '200' && res.data) {
                            this.$swal({
                                title: '添加成功!',
                                text: '您已经成功添加了一名用户',
                                type: 'success'
                            });
                        } else {
                            this.$swal({
                                title: '添加失败!',
                                text: res.message,
                                type: 'error'
                            });
                        }
                    }).catch(e => {
                        this.loading = false;
                        this.$swal({
                            text: e.message,
                            type: 'error',
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    })
                }
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
                        console.log(self.$refs.img);
                        self.$refs.img.src = this.result;
                    };
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