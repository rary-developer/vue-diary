<template>
  <transition name="modal">
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div>
          <div style="border: 1px solid bisque;">
            <p><strong>카테고리*</strong></p>
            <select>
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
          <div>
            <p><strong>일자*</strong></p>
            <input type="date"/>
          </div>
        </div>
        <div>
          <p><strong>주소*</strong></p>
          <div>
            <input type="text" id="" @click="searchMap()" v-model="address">
          </div>
        </div>
        <div>
          <p><strong>내용*</strong></p>
          <textarea placeholder="내용을 입력하세요." maxlength="500" v-model="content" cols="80" rows="5">

          </textarea>
        </div>
        <div>
          <p><strong>사진첨부</strong></p>
          <div>
            
          </div>
        </div>
      </div>      
    </div>
  </transition>
</template>

<script>
//import {VueDaumPostcode} from "vue-daum-postcode";

export default {
  components:{
    //VueDaumPostcode
  },
  date(){
    return{      
      address: '',
      postOpen: false,
      content: '',
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
    
  }
}
</script>

<style>
.form-box{ position:relative; z-index: 1; width:100%; height:500px; display:flex; justify-content: center; align-items: center; flex-wrap: wrap; }
.form-box input{ width:400px; height:50px; border:1px solid; border-radius: 3px; }
.form-box div{ margin-left:50px; width:150px; height:50px; background-color: #5366cf; font-size:15px; color:white; display: flex; justify-content: center; align-items: center; cursor:pointer; }
.post-box{ z-index: 2; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; }
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
  height: 50%;
}
</style>
