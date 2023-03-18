<template>
  <div>
    <div class="main contents" style="border: 1px solid black">
      <h1 class="page-header">My Memory</h1>
      <div class="" style="border: 1px solid #3fc1c9">
        <div class="schCond" style="display:flex; width: 100%; height: 40px">
          <input 
            value=""
            class=""
            style="width:80%"
            placeholder="검색어를 입력해주세요."
          >
          <button
              type="button="
              class="btn filter_button"
              @click="fn_openFilterModal()"
          >
            필터
          </button>
        </div>
      </div>
      <div class="" style="display:flex; margin-top:16px;height:40px;border: 1px solid #4CAF50">
        <p  style="">n 개중 n개</p>
        <button type="button" @click="fn_openEnrollModal()" class="btn" style="">
          등록
        </button>
      </div>
      <ul style="margin-top: 16px; border: 1px solid #679fe6">
        <li class="">
          <div class="item">
            <div class="img" style="">              
              <img src="@/assets/logo.png" class="">              
            </div>
            <div class="text">
                <div class="etc"></div>
                <p class="desc">내용 내용 내용 내용 내용 </p>
                <p class="date">2023.03.07</p>
              </div>
          </div>
        </li>
      </ul>
    </div>

    <ModalFilterView v-if="showFilterModal"
      @close-modal="fn_closeFilterModal"
    >
    
    </ModalFilterView>

    <ModalEnrollView v-if="showEnrollModal"
      @close-modal="fn_closeEnrollModal"
    >

    </ModalEnrollView>

  </div>  
  
</template>

<script>
import ModalFilterView from '../components/modal/MemoryModalView.vue';
import ModalEnrollView from '../components/memory/MemoryInfoView';

export default {
  components:{
    ModalFilterView,
    ModalEnrollView,
  },
  data(){
    return {
      showFilterModal: false,
      showEnrollModal: false,
      memoryList : this.$store.getters["memoryIndex/getMemoryList"],
      userNo : this.$store.getters["userIndex/getUserNo"],
    }
  },
  methods:{
    memoryRender(){
      const param = {
        userNo : this.$store.getters["userIndex/getUserNo"],
        page : 1,
        limit : 100,
      }

      this.$store.dispatch("MEMORY_DATA", param)
        .then((response)=>{
          console.log(response);
        })

    },
    fn_openFilterModal(){
      this.showFilterModal=true;
    },
    fn_closeFilterModal(){      
      this.showFilterModal=false;
    },
    fn_openEnrollModal(){      
      this.showEnrollModal = true;
    },
    fn_closeEnrollModal(){
      console.log(123);
      this.showEnrollModal = false;
    }
  },
  mounted(){
    this.memoryRender();
  }
}
</script>

<style>
.list-container {
	padding-top: 13px;
}
.contents {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 5px;
  width: 100%;  
}
li{
  list-style: none;
}
.item{
  display: flex;
  padding: 15px 0;
  background-color: #fff;
  margin: 0 15px;
  border-bottom: 1px solid #ddd;
}
.btn{
  margin-left: 15px;
  font-weight: 700;
  border-radius: 0.25rem;
  padding: 0 24px;
}
.filter_button{
  float: right;
  background: #9e9e9e;
  color: white;
}
.item .img{
  width: 30%;
  height: auto;
  aspect-ratio: 1/1;
  overflow: hidden;
}
.item .img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.text{
  width: 70%;
  height: auto;
  position: relative;
  padding: 10px;  
}
.etc{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  padding-right: 30px;
}
.date{
  font-size: 0.8rem;
  margin-top: 1em;
}

</style>
