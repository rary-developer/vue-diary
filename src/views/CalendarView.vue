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
  </div>
</template>


<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
//import { INITIAL_EVENTS } from '@/utils/event-utils'
//import ModalView from '@/components/ModalView.vue'
import UserSvc from '@/service/UserSvc';

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
  },

  data: function() {
    return {      
      userNo:'',
      year: '',
      month: '',            
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
        events: [
          
        ],
        locale:"ko",
        initialView: 'dayGridMonth',        
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        // eventClick: this.handleEventClick,
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
      console.log(response.data.data);
      console.log(this.calendarOptions.events),
      this.calendarOptions.events = [
        ...this.calendarOptions.events,response.data.data
      ]
      //this.data.push(response.data.data);
      //this.$store.commit('setDiaryList', response.data.data);      
      // this.events.push(response.data.data);
      // console.log(this.events);
    }
    ,
    // handleWeekendsToggle() {
    //   this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    // },

    handleDateSelect(selectInfo) {
      //let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection
      
      console.log(selectInfo);
      // calendarApi.addEvent({
      //   userNo: this.userNo,        
      //   start: selectInfo.startStr,        
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay
      // })
      
    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
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
