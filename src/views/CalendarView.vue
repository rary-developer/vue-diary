<template>
  <div class='demo-app'>    
    <div class='demo-app-main'>
      <FullCalendar
        id="calendar"
        ref="calendar"
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
    
    
    <ModalView v-if="showModal" v-bind:dayEventData="dayEventData" @delete-item=fn_deleteItem @close-modal="fn_closeModal">
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
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;    

    month = month > 9 ? month : `0${month}`;
    
    this.fetchDiary(year,month);
    
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
      showModal: false,           
      dayEventData : [],
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
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
      for(var i=0; i<eventData.length; i++){
        eventData[i].title = eventData[i].contents;
        eventData[i].start = eventData[i].regDate;
        eventData[i].id = eventData[i].diaryNo;
        //해당 달 데이터 추가
        this.calendarOptions.events = [
          ...this.calendarOptions.events,eventData[i]
        ]
      }     
      
    },
    fn_closeModal(){
      this.showModal=false;
      location.reload();
    }
    ,
    handleDateSelect(selectInfo) {
      //let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect() // clear date selection                  

      this.dayEventData = [];
      
      this.inputDayEventData(selectInfo);      
      
      this.showModal = true;      
    },

    inputDayEventData(selectInfo){      
      this.calendarOptions.events.map((i)=>{                
        if(selectInfo.startStr == i.start){
          this.dayEventData.push(i);
        }
      })
    },    
    
    async fn_deleteItem(id){			
			const param = {
				diaryNo: id,
			}
			const response = await UserSvc.deleteDiary(param);
			if(response.data.code == "1"){
				alert(response.data.msg);
				//dayEventData 삭제 props데이터 수정
			this.dayEventData = this.dayEventData.filter(
        (item)=> (item.id != id)
      );
      
				
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
  min-height: 100%;
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
