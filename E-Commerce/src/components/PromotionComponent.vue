<script>
export default {
  name: 'PromotionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
  },
}
</script>
<template>
  <div class="Promotion-container" :style="{ backgroundColor: background }">
    <div class="content">
      <h3 class="text">{{ title }}</h3>
      <button class="button" :style="{ backgroundColor: button }">Shop Now →</button>
    </div>
    <img :src="image" class="promo-image" />
  </div>
</template>
<style>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 50px;
}
.Promotion-container {
  margin-top: 50px;
  border: 1px solid #f1d224;
  border-radius: 10px;
  padding: 10px;
  width: 590px;
  height: 250px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.text {
  font-family: sans-serif;
  font-size: 25px;
  width: 250px;
  font-weight: bold;
}
.button {
  border: 1px solid rgb(152, 233, 19);
  border-radius: 10px;
  text-align: center;
  width: 150px;
  height: 50px;
  font-family: sans-serif;
  color: white;
  font-size: 15px;
  font-weight: bold;
}
.promo-image {
  width: 420px;
  height: 250px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
