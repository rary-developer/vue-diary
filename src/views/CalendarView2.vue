<template>
  <div class="sec_cal">
  <div class="cal_nav">
    <button class="nav-btn go-prev" @click="prevMonth">prev</button>
    <div class="year-month">{{ currentYear }}년 {{ currentMonth }}월</div>
    <button class="nav-btn go-next" @click="nextMonth">next</button>
  </div>
  <div class="cal_wrap">
    <div class="days">
      <div class="day">SUN</div>
      <div class="day">MON</div>
      <div class="day">TUE</div>
      <div class="day">WED</div>
      <div class="day">THU</div>
      <div class="day">FRI</div>
      <div class="day">SAT</div>      
    </div>
    <div class="dates">
      <div v-for="(item, index) in calendarInfo" :key="index" class="cal"> <!--key-->
        <div @click="handleDateSelect(item.date)">
          <div class="fc-daygrid-day-frame">
            <div class="fc-daygrid-day-top">                            
              <p class="fc-daygrid-day-number">{{ item.day }}</p>
            </div>
            <div class="fc-daygrid-day-events">
              <div 
                v-for="(info, index) in calendarEvent" 
                :key="index" 
                class="fc-daygrid-day-events"
                ><!--중복키 값-->
                <p 
                  v-if="info.regDate == item.date"
                  class="fc-daygrid-event-harness"
                >
                  {{info.contents}}
                </p>
              </div>
            </div>            
          </div>
        </div>        
        <!-- {{ item.date }} -->
      </div>
    </div>
  </div>

  <ModalView v-if="showModal" 
      v-bind:dayEventData="dayEventData" 
      v-bind:startStr="startStr"
      @delete-item="fn_deleteItem"
      @edit-item="fn_editItem"
      @save-item="fn_saveItem"
      @add-item="fn_addItem"
      @close-modal="fn_closeModal"
      @change-data="fn_change_data"
    >
      <template>
        
      </template>
    </ModalView>
</div>
</template>

<script>
import UserSvc from '@/service/UserSvc';
import ModalView from '../components/ModalView.vue';

export default {  
  components:{
    ModalView
  },
  // computed:{
  //   setUserNo(){
  //     return this.userNo = this.$store.getters.getUserNo;
  //   }
  // },
  data(){
    return{
      userNo: this.$store.getters.getUserNo, //computed
      currentYear: 0,
      currentMonth: 0,      
      currentDate: '',
      currentDay: '',
      
      lastDate: '',
      lastDay:'',
      year: '',
      month: '',      
      date: '',
      day: '',

      calendarInfo: [],
      calendarEvent: [],
      dayEventData: [],

      regDate: '',

      showModal: false,
    }    
  },
  methods: {
    calendarRender(){      
      
      //지난달
      var prevDay = new Date(this.currentYear, this.currentMonth-1, 0);
      this.lastDate = prevDay.getDate();
      this.lastDay = prevDay.getDay();
      
      //이번달
      var startDay = new Date(this.currentYear, this.currentMonth, 0);
      this.currentDate = startDay.getDate();
      this.currentDay = startDay.getDay();
      
      this.calendarInfo = [];
      var year = `${this.currentYear}`;
      var month = this.currentMonth > 9 ? `${this.currentMonth}` : `0${this.currentMonth}`;
      
      for(let i = this.lastDate - this.lastDay ; i <= this.lastDate; i++ ){        
        this.calendarInfo.push({
          "day":i, "date":""
        });
      }

      for(var i= 1; i<= this.currentDate; i++){
        var day = i < 10 ? '0'+i.toString() : i.toString();        
        this.calendarInfo.push({
          "day":i, 
          "date":year+"-"+month+"-"+day
        });
      }
      
      this.year = this.currentYear;
      this.month = this.currentMonth > 9 ? this.currentMonth : `0${this.currentMonth}`;
      
      this.fetchDiary();

    },
    async fetchDiary(){
      this.calendarEvent = [];
      this.dayEventData = [];
      const param = {
        year: this.year,
        month: this.month,
        userNo: this.userNo
      }            
      
      this.$store.dispatch('DIARY_DATA', param)
        .then(()=>{
          this.calendarEvent = this.$store.getters.getDiaryList
          if(this.regDate){
            //filter
            for(var i =0; i<this.calendarEvent.length; i++){
              if(this.regDate == this.calendarEvent[i].regDate){
                this.dayEventData.push(this.calendarEvent[i]);
              }
            }
            // const result = this.calendarEvent.filter(cal => this.regDate == cal.regDate){
            //   this.dayEventData = [this.dayEventData, …result]
            // }
          }
        })
    }
    ,
    prevMonth(){
      //day.js
      if(this.currentMonth - 1 < 1){                
        this.currentYear = this.currentYear-1;
        this.currentMonth = 12;
      }else{        
        this.currentMonth = this.currentMonth-1;
      }      

      this.calendarRender();
    },
    nextMonth(){
      if(this.currentMonth +1 > 12){
        this.currentYear = this.currentYear+1;
        this.currentMonth = 1;
      }else{
        this.currentMonth = this.currentMonth+1;
      }
      this.calendarRender();  
    }
    ,
    handleDateSelect(selectDate){      
      this.dayEventData = [];
      this.startStr = '';
      this.regDate = selectDate;
      this.inputDayEventData(selectDate);
      
      this.showModal = true;
    },
    inputDayEventData(selectDate){      
      this.startStr = selectDate;
      for(var i=0; i<this.calendarEvent.length; i++){
        if(this.startStr == this.calendarEvent[i].regDate){          
          var data = this.calendarEvent[i];          
          data.title = this.calendarEvent[i].contents;
          data.start = this.calendarEvent[i].regDate;
          data.id = Math.random();
          this.dayEventData.push(this.calendarEvent[i]);          
        }
      }      
    },
    async fn_deleteItem(diaryNo){			
			const param = {
				diaryNo: diaryNo,
			}
			const response = await UserSvc.deleteDiary(param);
			if(response.data.code == "1"){
				alert(response.data.msg);
				//dayEventData 삭제 props데이터 수정
        this.dayEventData = this.dayEventData.filter(
          (item)=> (item.diaryNo != diaryNo)
        );

        this.fetchDiary(this.year, this.month);
			}
		},
    fn_addItem(startStr){      
      var param = {
        contents: "",
        id: Math.random(),
        regDate: startStr,
        diaryNo: "",
        start: startStr,
        title: "",
        userNo: this.$store.getters.getUserNo,
      };      
      
      this.dayEventData.push(param);
    },
    fn_change_data(id, contents){            
      var idx = this.dayEventData.findIndex((item) => item.id == id);
      this.dayEventData[idx].contents = contents;
    },
    fn_closeModal(){
      this.showModal=false;
      //닫기만
    },
    async fn_saveItem(id){      
      var req = this.dayEventData.filter((item)=> item.id==id)[0];
      
      const param = {
        regDate: req.start,
        contents: req.contents,
        userNo : this.$store.getters.getUserNo,
      }

      const {data} = await UserSvc.saveDiary(param);
      
      if(data.code == 1){
        //this.dayEventData = [];
        
        alert(data.msg);
        //저장 후 데이터 가져오기
        this.fetchDiary(this.year, this.month);
        
        //데이터 넣고.. 가져와서 쓰기.. 왜 안될까
        // for(var i =0; i<this.calendarEvent.length; i++){
        //   console.log(this.calendarEvent[i]);
        //   if(req.start == this.calendarEvent[i].regDate){
        //     this.dayEventData.push(i);
        //   }
        // }
        
        return;
      }else{
        alert(data.msg);
        return;
      }
    },
    async fn_editItem(diaryNo,contents){
      var req = this.dayEventData.filter((item)=> item.diaryNo==diaryNo)[0];
      const param = {
				diaryNo: req.diaryNo,
				regDate: req.start,
				contents: req.contents,
				userNo: this.$store.getters.getUserNo,
			}			
      
			const { data } = await UserSvc.saveDiary(param);
			if(data.code == 1){
				alert(data.msg);
				var idx = this.dayEventData.findIndex((item) => item.diaryNo == diaryNo);
        this.dayEventData[idx].contents = contents;
        return;
			}else{
        alert(data.msg);
        return;
      }						
    }
  },  
  mounted(){
     // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    this.year = date.getFullYear();
    this.month = date.getMonth()+1;
    this.date = date.getDate();
    this.day = date.getDay();    
    
    
    this.currentYear = date.getFullYear(); // 달력에서 표기하는 연
    this.currentMonth = date.getMonth()+1; // 달력에서 표기하는 월    
    this.currentDate = date.getDate(); // 달력에서 표기하는 일    
    
    //var thisMonth = new Date(date.getFullYear(), date.getMonth()+1, date.getDate());
    //this.setUserNo();
    this.calendarRender();
  },
}
</script>

<style>
/* section calendar */

.sec_cal {
    width: 70%;
    margin: 0 auto;
    font-family: "NotoSansR";
}

.sec_cal .cal_nav {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 48px;
    line-height: 78px;
}

.sec_cal .cal_nav .year-month {
    width: 300px;
    text-align: center;
    line-height: 1;
}

.sec_cal .cal_nav .nav {
    display: flex;
    border: 1px solid #333333;
    border-radius: 5px;
}

.sec_cal .cal_nav .go-prev,
.sec_cal .cal_nav .go-next {
    display: block;
    width: 50px;
    height: 78px;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sec_cal .cal_nav .go-prev::before,
.sec_cal .cal_nav .go-next::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border: 3px solid #000;
    border-width: 3px 3px 0 0;
    transition: border 0.1s;
}

.sec_cal .cal_nav .go-prev:hover::before,
.sec_cal .cal_nav .go-next:hover::before {
    border-color: #ed2a61;
}

.sec_cal .cal_nav .go-prev::before {
    transform: rotate(-135deg);
}

.sec_cal .cal_nav .go-next::before {
    transform: rotate(45deg);
}

.sec_cal .cal_wrap {
    padding-top: 40px;
    position: relative;
    margin: 0 auto;
}

.sec_cal .cal_wrap .days {
    display: flex;
    /* margin-bottom: 20px;
    padding-bottom: 20px; */
    border-bottom: 1px solid #ddd;
}

.sec_cal .cal_wrap::after {
    top: 368px;
}

.sec_cal .cal_wrap .day {
    display:flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 7);
    height: 30px;
    text-align: left;
    color: #999;
    font-size: 12px;
    text-align: center;
    border-radius:5px
}

.cal {    
    width: calc(100% / 7);
    height: 100px;    
    color: #999;
    font-size: 12px;            
}

.current.today {background: rgb(242 242 242);}

.sec_cal .cal_wrap .dates {
    display: flex;
    flex-flow: wrap;
    height: 290px;
}

.sec_cal .cal_wrap .day:nth-child(7n ) {
    color: #3c6ffa;
}

.sec_cal .cal_wrap .cal:nth-child(7n ) {
    color: #3c6ffa;
}

.sec_cal .cal_wrap .day:nth-child(7n + 1) {
    color: #ed2a61;
}

.sec_cal .cal_wrap .cal:nth-child(7n + 1) {
    color: #ed2a61;
}

.sec_cal .cal_wrap .day.disable {
    color: #ddd;
}
.fc-daygrid-day-frame{
  min-height: initial;
  padding: 2px;
}
.fc-daygrid-day-top{
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
  height: 30px;
}
.fc-daygrid-day-number{
  position: relative;
  z-index: 4;
  padding: 4px;
}
.fc-daygrid-day-events{  
  left: 0;
  right: 0;
  color: black;
  margin-top: 1px;
}
.fc-daygrid-event-harness{
  position: relative;  
}
</style>
