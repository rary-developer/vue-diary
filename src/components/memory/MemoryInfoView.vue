<template>
  <transition name="modal">
    <div class="modal modal-overlay">
      <div class="modal-window">
        <h1>필터</h1>        
          <button 
            @click="$emit('close-modal')" 
            class="" 
            style="border:0px; text-align: right;"
          >
            <i class="xi-close"></i>
          </button>         
        <div>
          <div style="border: 1px solid magenta;">
            <p><strong>카테고리*</strong></p>
            <select v-model="category">
              <option value="">선택</option>
              <option value="FOOD">음식</option>
              <option value="SHOPING">쇼핑</option>
              <option value="TRIP">여행</option>
              <option value="MOVIE">영화</option>
              <option value="STUDY">공부</option>
              <option value="CAFE">카페</option>
              <option value="EXOTIC">해외</option>
              <option value="CULTURAL_LIFE">생활</option>
              <option value="EXHIBITION">취미</option>
              <option value="REVIEW">리뷰</option>
            </select>
          </div>
          <div style="border: 1px solid magenta">
            <p><strong>일자*</strong></p>            
            <!-- <date-picker v-model="regDate" range></date-picker> -->
            <date-picker v-model="regDate" valueType="format"></date-picker>
          </div>
        </div>
        <div style="border: 1px solid magenta;">
          <p><strong>주소*</strong></p>
          <div>
            <input type="text" id="" @click="searchMap" v-model="address" style="width:50%">
          </div>
        </div>
        <div style="border: 1px solid magenta;">
          <p><strong>내용*</strong></p>
          <textarea 
            placeholder="내용을 입력하세요." 
            maxlength="500" 
            v-model="content" 
            cols="80" 
            rows="5"
          >
          </textarea>
        </div>
        <div style="border: 1px solid magenta;">
          <p><strong>사진첨부</strong></p>
          <div class="add-file">
              <div 
                class="thumb-img" 
                v-for="(item, idx) in fileList" 
                :key="idx" 
                style="{ 'background-image' : `url('${item}')` }"
              >
              {{ item }}                  
              </div>
              <label 
                for="btnFileUpload" 
                class="fileLabel" 
                v-if="this.fileList.length < 3"
              >
                <i class="xi-plus-circle-o"></i>
              </label>
              <input 
                type="file" 
                multiple 
                @change="fn_file_change"
                id="btnFileUpload"
                style="display:none;"                
              >
          </div>
        </div>
        <div style="border: 1px solid magenta; margin-top: 24px;">
          <button @click="fn_save_memory" class="btn">등록하기</button>
          <button @click="$emit('close-modal')" class="btn">취소하기</button>
        </div>
      </div>      
    </div>
  </transition>
</template>

<script>
//import {VueDaumPostcode} from "vue-daum-postcode";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components:{
    DatePicker
  },
  data(){
    return{      
      postOpen: false,

      address: '',      
      content: '',
      category: '',
      regDate: '',
      
      fileList : [],
      
    }
  },
  computed:{

  },
  methods: {
    searchMap: function() {
        new daum.Postcode({
            oncomplete: (data) => {
                // console.log(this); // vue
                this.address = data.address;
            }
        }).open();
    },
    fn_file_change(e){          
      const file = e.target.files;      
      if(e.target.files.length > 3){
        alert("사진은 3장까지만 등록이 가능합니다.");
        return;
      }
      if(this.fileList.length > 2){
        alert("사진은 3장까지만 등록이 가능합니다.");
        return;
      }
      if(this.fileList.length + e.target.files.length > 3){
        alert("사진은 3장까지만 등록이 가능합니다.");
        return;
      }
      for(let i =0; i<file.length; i++){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file[i]);
        fileReader.onload = () =>{
          this.fileList.push(fileReader.result);
        }
      }
    },    
    fn_save_memory(){

    }
  }
}
</script>

<style>
.form-box{ position:relative; z-index: 1; width:100%; height:500px; display:flex; justify-content: center; align-items: center; flex-wrap: wrap; }
.form-box input{ width:400px; height:50px; border:1px solid; border-radius: 3px; }
.form-box div{ margin-left:50px; width:150px; height:50px; background-color: #5366cf; font-size:15px; color:white; display: flex; justify-content: center; align-items: center; cursor:pointer; }
.post-box{ z-index: 2; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; }
.btn{
  margin-left: 15px;
  font-weight: 700;
  border-radius: 0.25rem;
  padding: 0 24px;
  height: 40px;
}
.modal-overlay{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modal-window{
  background: #fff;
  border-radius: 4px;
  overflow: scroll;
  width: 50%;
  height: 70%;
}
.add-file{
  display: flex;
  align-items: center;
  gap: 10px;
}
.thumb-img{
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 10px;  
  background-size: cover;
}
.fileLabel{
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
