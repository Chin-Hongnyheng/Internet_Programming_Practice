<template>
  <div class="category-card" :style="{ backgroundColor: color }">
    <img :src="image" />
    <h3 style="font-weight: bold">{{ name }}</h3>
    <span>{{ productCount }} Items</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoryComponent',
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.category-card {
  width: 160px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 10px;

  /* Smooth animation */
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.category-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  transform: translateY(-6px);
  cursor: pointer;
}
</style>
