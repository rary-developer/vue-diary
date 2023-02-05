<template>			
	<transition name="modal">
		<div class="modal modal-overlay">			
			<div class="modal-window">
				<h2>Diary Info</h2>
				<button @click="$emit('add-item', startStr)" class="btn-add">추가</button>
				<button @click="$emit('close-modal')" class="btn-add">닫기</button>
				<div class="modal-card" v-for="item in dayEventData" :key="item.id">					
					<div :bind="item.id">
						<input type="text" class="txt" :value="item.contents" @change="$emit('change-data', item.id, $event.target.value)"/>
						<button 
							v-if="item.diaryNo !== ''" 
							@click="$emit('edit-item',item.diaryNo, item.contents)"
							class="btn-edit"
						>수정</button>
						<button 
							v-if="item.diaryNo !== ''" 
							@click="$emit('delete-item', item.diaryNo)"
							class="btn-del"
						>삭제</button>
						<button 
							v-if="item.diaryNo == ''" 
							@click="$emit('save-item', item.id)"
							class="btn-save"
						>저장</button>
						<!-- <button :show="item.id" @click="enableEdit(item.id)">취소</button> -->
					</div>
				</div>
				<!-- <footer class="modal-footer">
					<slot name="footer">
						<button @click="$emit('close-modal')">닫기</button>
					</slot>
				</footer> -->				
			</div>												
		</div>
	</transition>
</template>

<script>
//import UserSvc from '@/service/UserSvc';

export default {
	name: 'dayEventData',
	props: ['dayEventData','startStr'],
	// data(){
	// return{
	// eventData : this.dayEventData
	// }
	// },	
	created(){

	},	
	methods: {

	},
}
</script>

<style coped>
.modal-overlay{
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 30;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	
}
.modal-window{
	background: #fff;
  border-radius: 4px;
  overflow: scroll;	
	width: 50%;
	height: 50%;
}
.modal-card{
	padding: 10px 20px;	
}
.modal-footer{
	background: #ccc;
  padding: 10px;
  text-align: right;	
}
.show{
	display: block;
}
.hide{
	display: none;
}
.txt{
	width: 70%;
	padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.btn-add{
	background-color: #e7e7e7; 
	border: 1px solid black;
  color: black;
	padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
.btn-edit{
	background-color: #e7e7e7; 
  border: none;
  color: black;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
.btn-del{
	background-color: #f44336; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.btn-save{
	background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;  
}
</style>