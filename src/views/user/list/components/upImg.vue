  <template>
   <!-- <v-container> -->
     <!-- <v-layout> -->
       <v-flex>
         <v-btn
          @click="upload"
          depressed
        >
           点击修改头像
           </v-btn>
         <input
          type="file"
          id="upload"
          ref="upload"
          @change="changeimg"
          accept=".jpg, .jpeg, .png"
        >
     </v-flex>
       <!-- </v-layout> -->
     <!-- </v-container> -->
   </template>

 <script>
//  import myService from '@/services/myService'
 import {
        uploadImage,
    } from "@/api/user";
 export default {
     components: {
     },
     data () {
       return {
       }
     },
     methods: {
         upload () {
             let uploadbtn = this.$refs.upload
             uploadbtn.click()
         },
         async changeimg (e) {
             let formData=new FormData()
             formData.append('file', e.target.files[0])
             uploadImage(formData).then(res => {
                console.log('send')
             })
            //  await uploadImage.fun(formData)
         }
     }
   }
 </script> 
 <style scoped>
 #upload{
     height: 0;
     width:0;
     visibility:hidden;
 }
</style>