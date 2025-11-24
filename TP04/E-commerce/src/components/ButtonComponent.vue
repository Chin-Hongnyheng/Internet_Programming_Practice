<template>
  <button class="button" :style="{ backgroundColor: buttonColor }">Shop Now →</button>
</template>
<script lang="ts">
export default {
  name: 'ButtonComponent',
  props: {
    buttonColor: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
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
</style>
