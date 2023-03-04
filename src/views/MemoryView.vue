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
<!--        <li class="row">-->
<!--          <div class="card mb-3">-->
<!--            <div class="row g-0" style="height:100%">-->
<!--              <div class="col-md-4">-->
<!--                <img src="" class="img-fluid rounded-start">-->
<!--              </div>-->
<!--              <div class="col-md-8">-->
<!--                <div class="card-body">                  -->
<!--                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>-->
<!--                  <p class="card-text"  style="text-align: right;">-->
<!--                    <small class="text-muted">-->
<!--                      Last-->
<!--                    </small>-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
        <li class="">
          <div class="">
            <div class="" style="">
              <div class="">
                <img src="@/assets/logo.png" class="">
              </div>
              <div class="">
                <div class="">
                  <p class="">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class=""  style="text-align: right;">
                    <small class="">
                      Last
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <ModalFilterView v-if="showFilterModal"
      @close-modal="fn_closeFilterModal"
    >
    
    </ModalFilterView>

    <ModalEnrollView v-if="showEnrollModal">

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
    }
  },
  methods:{
    fn_openFilterModal(){
      this.showFilterModal=true;
    },
    fn_closeFilterModal(){
      this.showFilterModal=false;
    },
    fn_openEnrollModal(){
      this.showEnrollModal = true;
    }
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
</style>
