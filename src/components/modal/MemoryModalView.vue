<template>
  <transition name="modal">
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-top">
          <button type="button" @click="$emit('close-modal')" class="btn-close" aria-label="Close">          
          </button>
        </div>
        <div class="form-wrapper">
          <div>
            <p><strong>검색날짜</strong></p>
            <date-picker v-model="regDate" valueType="format"></date-picker>
          </div>
          <div>
            <p><strong>위치</strong></p>
            <div>
              <input type="text" id="" @click="fn_searchMap" v-model="address" style="width:50%">
            </div>
          </div>
          <div>
            <p><strong>카테고리</strong></p>
            <select name="" v-bind="category" id="schCategory">
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
          <div style="border: 1px solid magenta; margin-top:  24px;">
          <button type="button" class="btn" @click="fn_btmReset()">초기화</button>
          <button @click="$emit('filter_info', this.regDate)" type="button" class="btn" >적용</button>
        </div>
        </div>
      </div>


    </div>
  </transition>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
  components: {
    DatePicker
  },
  data(){
    return{
      address: '',            
      category: '',
      regDate: '',
    }
  },
  methods:{
    fn_btmReset(){
      this.schDate = "";
      this.schPlace = "";
      this.schPlace = "";
    },
    fn_searchMap: function() {
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
.modal-top{
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.show{
	display: block;
}
.hide{
	display: none;
}
.btn{
  margin-left: 15px;
  font-weight: 700;
  border-radius: 0.25rem;
  padding: 0 24px;
  height: 40px;
}
.txt{
	width: 70%;
	padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.btn-add{
	background-color: #e7e7e7; 
	border: 1px solid black;
  color: black;
	padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
.btn-edit{
	background-color: #e7e7e7; 
  border: none;
  color: black;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
.btn-del{
	background-color: #f44336; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.btn-save{
	background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
</style>
