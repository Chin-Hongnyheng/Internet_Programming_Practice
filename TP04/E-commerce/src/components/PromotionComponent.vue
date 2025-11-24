<template>
<div class="Promotion-card" :style="{backgroundColor: color}">
    <div class="content">
        <h3 class="text">{{ title }}</h3>
        <ButtonComponent :buttonColor="buttonColor"/>
    </div>
    <img :src="image" class="promo-image"></img>
</div>
</template>

<script lang="ts">
import ButtonComponent from './ButtonComponent.vue';
export default{
    name: 'PromotionComponent',
    props: {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        buttonColor: {
            type: String,
            required: true,
        },
    },
    components:{
        ButtonComponent
    }
}
</script>

<style scoped>
.Promotion-card {
  margin-top: 50px;
  border: 1px solid #f1d224;
  border-radius: 10px;
  padding: 10px;
  width: 700px;
  height: 350px;

  display: flex;
  align-items: center;
  position: relative;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.Promotion-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  transform: translateY(-6px);
  cursor: pointer;
}       
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 50px;
}
.text {
  font-family: sans-serif;
  font-size: 30px;
  width: 280px;
  font-weight: bold;
}
.promo-image {
  position: absolute;
  bottom: 0px;
  right: 0px;
  max-width: 100%;
    height:320px;
}
</style>