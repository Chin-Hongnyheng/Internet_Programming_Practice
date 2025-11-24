<template>
  <div class="Menu-card">
    <h1 class="text">{{ title }}</h1>
    <div class="navigation">
      <button class="group-btn" style="font-weight: bold">All</button>
      <button v-for="(group, index) in groups" :key="index" class="group-btn">
        {{ group }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuComponent',
  props: {
    groups: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scope>
.Menu-card {
  width: 100%;
  max-width: 1800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-family: 'Quicksand', sans-serif;
}
.group-btn:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  transform: translateY(-6px);
  cursor: pointer;
}
.text {
  font-size: 40px;
  font-weight: 700;
  color: #253d4e;
  margin: 0;
}
.group-btn {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #7e7e7e;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.3s ease;
  position: relative;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.group-btn:hover {
  color: #3bb77e;
}
.group-btn:active {
  color: #3bb77e;
  font-weight: 700;
}
.navigation {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
