<template>
  <div class="modal">
    <div class="overlay" @click="$emi('close-modal')"></div>
    <div class="modal-card">

    </div>
  </div>
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