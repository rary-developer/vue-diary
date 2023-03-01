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
      <ul>
        <li>
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
  </div>
</template>

<script>
export default {

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