<template>
  <transition name="modal">
    <div class="modal modal-overlay">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <div>
            <label for="schDate">검색 날짜</label>
            <input type="date" id="schDate">
          </div>
          <div>
            <label for="schPlace">위치</label>
            <input type="text" id="schPlace">
          </div>
          <div>
            <p>카테고리</p>
            <select name="" id="schCategory">
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
            <button type="button">초기화</button>
            <button type="button">적용</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style>

</style>