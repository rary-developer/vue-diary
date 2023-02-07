<template>
  <div class="sec_cal">
    <div class='rap'>
      <div class="header">
        <div class="btn prevDay"></div>
        <h2 class='dateTitle'></h2>
        <div class="btn nextDay"></div>
      </div>
    
      <div class="grid dateHead">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>

      <div class="grid dateBoard"></div>
    </div>
  </div>
</template>

<script>
export default {  
  data(){
    return{
      userNo: this.$store.getters.getUserNo,
      currentYear: '',
      currentMonth: '',      
      currentDate: '',
      currentDay: '',

      lastDate: '',
      lastDay:'',

      year: '',
      month: '',      
      date: '',
      day: '',
    }    
  },
  methods: {
    calendarRender(){
      this.currentYear = this.year;
      this.currentMonth = this.month;      
      this.currentDate = this.date;
      this.currentDay = this.day;
      
      var prevDay = new Date(this.currentYear, this.currentMonth-1, 0);
      this.lastDate = prevDay.getDate();
      this.lastDay = prevDay.getDay();
      
      var startDay = new Date(this.currentYear, this.currentMonth, 0);
      this.currentDate = startDay.getDate();
      this.currentDay = startDay.getDay();
      
      
    },
  },  
  mounted(){
     // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    this.year = date.getFullYear();
    this.month = date.getMonth()+1;
    this.date = date.getDate();
    this.day = date.getDay();    
    
    
    this.currentYear = date.getFullYear(); // 달력에서 표기하는 연
    this.currentMonth = date.getMonth(); // 달력에서 표기하는 월    
    this.currentDate = date.getDate(); // 달력에서 표기하는 일
    this.currentDay = date.getDay(); // 달력에서 표기하는 요일
    
    this.calendarRender();
  },
}
</script>

<style>
/* 달력 */
.dateHead div {
  background: greenyellow;
  color: black;
  text-align: center;
  border-radius: 5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
}

.grid div {
  padding: .6rem;
  font-size: .9rem;
  cursor: pointer;
}

.dateBoard div {
  color: #222;
  font-weight: bold;
  min-height: 6rem;
  padding: .6rem .8rem;
  border-radius: 5px;
  border: 1px solid #eee;
}

.noColor {
  background: #eee;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}

/* 좌우 버튼 */
.btn {
  display: block;
  width: 20px;
  height: 20px;
  border: 3px solid #000;
  border-width: 3px 3px 0 0;
  cursor: pointer;
}

.prevDay {
  transform: rotate(-135deg);
}

.nextDay {
  transform: rotate(45deg);
}

/* ---- */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;  
  font-family: Pretendard;
}

.rap {
  max-width: 820px;
  padding: 0 1.4rem;
  margin-top: 1.4rem;
}

.dateHead {
  margin: .4rem 0;
}
</style>