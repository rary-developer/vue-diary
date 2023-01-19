<template>
	<AppModal v-model="show" title="게시글">
		<template #default>
			<div class="row g-12">
				<div class="col-3 text-muted">제목</div>
				<div class="col-9">{{ title }}</div>								
			</div>
		</template>
		<template #actions>
			<button type="button" class="btn btn-secondary" @click="closeModal">
				닫기
			</button>
		</template>
	</AppModal>
</template>

<script>
export default {

}
</script>

<style>
.overlay{
  opacity: 0.5;  
}
.modal-card{
  position:relative;
  max-width: 80%;
  margin:auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>