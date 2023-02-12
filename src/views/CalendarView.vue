<template>
  <div class='demo-app'>    
    <div class='demo-app-main'>
      <FullCalendar
        id="fullCalendar"
        ref="fullCalendar"
        class='demo-app-calendar'
        :options='calendarOptions'        
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <!-- <ModalView v-if="showModal" @close="choModal = false"></ModalView> -->
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
      <template slot="footer">
        
      </template>
    </ModalView>
    
  </div>  
</template>


<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
//import { INITIAL_EVENTS } from '@/utils/event-utils'
import UserSvc from '@/service/UserSvc';
import ModalView from '../components/ModalView.vue';

export default {
  created(){    
    const date = new Date();
    this.year = date.getFullYear().toString();
    this.month = date.getMonth()+1;    

    this.month = this.month > 9 ? this.month : `0${this.month}`;
    
    this.fetchDiary(this.year, this.month);
    
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available    
    ModalView, 
  },

  data: function() {
    return {      
      userNo:'',
      year: '',
      month: '', 
      startStr: '',
      showModal: false,           
      dayEventData : [],
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        customButtons:{
          prev: {
            text: 'PREV',
            click: () => {                         
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.prev();
              if(Number(this.month) == 1){
                this.month = '12';
                this.year = String(Number(this.year)-1);                
              }else{                
                this.month = Number(this.month)-1 > 9 ? String(this.month-1) : `0${Number(this.month)-1}`;
              }
              this.fetchDiary(this.year,this.month);              
            }
          },
          next: {
            text: 'NEXT',
            click: () => {                         
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.next();
              if(Number(this.month) == 12){
                this.month = '01';
                this.year = String(Number(this.year)+1);
              }else{                
                this.month = Number(this.month)+1 > 9 ? String(this.month+1) : `0${Number(this.month)+1}`;
              }              
              this.fetchDiary(this.year,this.month);
            }
          }
        },
        headerToolbar: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },        
        events: [],
        locale:"ko",
        initialView: 'dayGridMonth',        
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },

  methods: {    
    async fetchDiary(year, month){      
      const param = {
        year : year,
        month : month,
        userNo : this.$store.getters.getUserNo,
      }
      
      const response = await UserSvc.fetchDiaryList(param);            
      var eventData = response.data.data;
      this.postData(eventData);                        
    }
    ,

    postData(eventData){
      this.calendarOptions.events = [];
      for(var i=0; i<eventData.length; i++){
        eventData[i].title = eventData[i].contents;
        eventData[i].start = eventData[i].regDate;
        eventData[i].id = Math.random();
        //해당 달 데이터 추가
        this.calendarOptions.events = [
          ...this.calendarOptions.events,eventData[i]
        ]
      }     
      
    },
    fn_change_data(id, contents){            
      var idx = this.dayEventData.findIndex((item) => item.id == id);
      this.dayEventData[idx].contents = contents;
    },

    fn_closeModal(){
      this.showModal=false;
      //닫기만
    }
    ,
    handleDateSelect(selectInfo) {      
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect() // clear date selection                  

      this.dayEventData = [];
      this.startStr = '';
      this.inputDayEventData(selectInfo);      
      
      this.showModal = true;      
    },

    inputDayEventData(selectInfo){            
      this.startStr = selectInfo.startStr;
      this.calendarOptions.events.map((i)=>{                
        if(selectInfo.startStr == i.start){
          this.dayEventData.push(i);
        }
      })
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
    }
    ,
    async fn_saveItem(id){      
      var req = this.dayEventData.filter((item)=> item.id==id)[0];
      const param = {
        regDate: req.start,
        contents: req.contents,
        userNo : this.$store.getters.getUserNo,
      }

      const {data} = await UserSvc.saveDiary(param);
      if(data.code == 1){
        alert(data.msg);
        //저장 후 데이터 가져오기
        this.fetchDiary(this.year, this.month);
        
        this.dayEventData = [];
        this.calendarOptions.events.map((i)=>{                               
          if(req.start == i.start){                                                
            this.dayEventData.push(i);
          }
        })
        
        return;
      }else{
        alert(data.msg);
        return;
      }
    }
    ,
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
    },
    handleEventClick() {      
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },

    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 80%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>
