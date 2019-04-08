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
        md8
      >
        <material-card
          color="green"
          title="添加用户"
          text="完善用户信息后，点击提交"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="用户名"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="初始密码"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="真实姓名"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="手机号"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Email"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="住址"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-select
                          v-model="provinceCode"
                          :items="province"
                          item-text="text"
                          item-value="value"
                          item-avatar="avatar"
                          label="省"
                          @change="changeProvince"
                          required
                          :loading="provinceLoading"
                  ></v-select>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-select
                          v-model="cityCode"
                          :items="city"
                          item-text="text"
                          item-value="value"
                          item-avatar="avatar"
                          label="市"
                          @change="changeCity"
                          required
                          :loading="cityLoading"
                  ></v-select>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-select
                          v-model="areaCode"
                          :items="area"
                          item-text="text"
                          item-value="value"
                          item-avatar="avatar"
                          label="区"
                          required
                          :loading="areaLoading"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="一个喜欢安静的程序员."
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    提交
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="https://pan.zealsay.com/20190317010254129000000.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >Follow</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {getProvinceList,getCityList,getAreaList} from '@/api/dict'
export default {
  name: 'add',
  data: () => ({
    province: [],
    city: [],
    area: [],
    provinceCode: {},
    cityCode: {},
    areaCode: {},
    provinceLoading: false,
    cityLoading: false,
    areaLoading: false,
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
  },
  methods: {
    changeProvince() {
      this.cityLoading = true;
      let obj = {};
      obj.code = this.provinceCode;
      getCityList(obj).then(res => {
        if (res.code === '200') {
          this.city = res.data.map(r => {
            return {
              value: r.code, text: r.name
            }
          });
        } else {
          this.$dialog.notify.error("拉取省市区信息失败!")
        }
        this.cityLoading = false;
      });
    },
    changeCity() {
      this.areaLoading = true;
      let obj = {};
      obj.code = this.cityCode;
      getAreaList(obj).then(res => {
        if (res.code === '200') {
          this.area = res.data.map(r => {
            return {
              value: r.code, text: r.name
            }
          });
        } else {
          this.$dialog.notify.error("拉取省市区信息失败!")
        }
        this.areaLoading = false;
      });
    }
  }
}
</script>
