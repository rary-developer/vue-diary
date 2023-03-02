<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">My Memory</h1>
      <div class="card mb-3">
        <div class="">
          <input 
            value="keyword"            
            class="form-control"
            placeholder="검색어를 입력해주세요."
          >
        </div>
        <div class="col-3">
          <button type="button" class="btn btn-primary" style="display:inline-block">필터</button>
        </div>
      </div>
      <div class="mb-3">
        <p  style="float:left; font-size: 16px;">n 개중 n개</p>
        <button type="button" class="btn" style="">
          등록
        </button>
      </div>
      <ul>
        <li class="row">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="" class="img-fluid rounded-start">
              </div>
              <div class="col-md-8">
                <div class="card-body">                  
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text"  style="text-align: right;">
                    <small class="text-muted">
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

    <ModalView v-if="showModal">
    
    </ModalView>
  </div>  
  
</template>

<script>
import ModalView from '../components/modal/MemoryModalView.vue'

export default {
  components:{
    ModalView,
  },
  data(){
    return {
      showModal: false,
    }
  },
  methods:{
    
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
</style>