<!--In each Component we need at least: script, template, and style-->
<script>
export default {
  name: 'CategoryComponent',
  // props: custom attribute that allow from one component to another component
  props: {
    title: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
    image: {
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: background }">
    <img :src="image" />
    <h3>{{ title }}</h3>
    <span class="count">{{ productCount }} items</span>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #81b13d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.count {
  color: #818080;
  font-size: 12px;
}
</style>
