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
            <input type="date" v-bind="schDate" id="schDate">
          </div>
          <div>
            <p><strong>위치</strong></p>
            <input type="text" v-bind="schPlace" id="schPlace">
          </div>
          <div>
            <p><strong>카테고리</strong></p>
            <select name="" v-bind="schCategory" id="schCategory">
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
            <button type="button" @click="fn_btmReset()">초기화</button>
            <button type="button">적용</button>
          </div>
        </div>
      </div>


    </div>
  </transition>
</template>

<script>

export default {
  components: {

  },
  data(){
    return{
      schDate:'',
      schPlace:'',
      schCategory:'',
    }
  },
  methods:{
    fn_btmReset(){
      this.schDate = "";
      this.schPlace = "";
      this.schPlace = "";
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
	height: 50%;
}
.modal-top{
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.modal-card{
	padding: 10px 20px;	
}
.modal-footer{
	background: #ccc;
  padding: 10px;
  text-align: right;	
}
.show{
	display: block;
}
.hide{
	display: none;
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
