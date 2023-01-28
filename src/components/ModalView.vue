<template>			
	<transition name="modal">
		<div class="modal modal-overlay">			
			<div class="modal-window" @click.self="$emit('close-modal')">
				<h2>Diary Info</h2>
				<div class="modal-card" v-for="item in dayEventData" :key="item.id">					
					<div :bind="item.id">						
						<input type="text" :value="item.contents" :disabled="item.id" />
						<button :show="item.id" @click="enableEdit(item.id)">수정</button>
						<button :show="item.id" @click="deleteItem(item.id)">삭제</button>
						<!-- <button :show="item.id" @click="enableEdit(item.id)">취소</button> -->
					</div>
				</div>
				<!-- <footer class="modal-footer">
					<slot name="footer">
						<button @click="$emit('close-modal')">닫기</button>
					</slot>
				</footer> -->
				<button @click="$emit('close-modal')">닫기</button>
			</div>												
		</div>
	</transition>
</template>

<script>
import UserSvc from '@/service/UserSvc';

export default {
	name: 'dayEventData',
	props: ['dayEventData'],
	created(){

	},
	methods: {
		enableEdit(id){
			console.log(id);

		},
		async deleteItem(id){
			console.log(id);
			const param = {
				diaryNo: id,
			}
			const response = await UserSvc.deleteDiary(param);
			if(response.data.code == "1"){
				alert(response.data.msg);
			}
		}
	}
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
  overflow: hidden;	
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
</style>