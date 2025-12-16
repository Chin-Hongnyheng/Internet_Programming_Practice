<template>
  <div class="decoration">
    <div>----------------------------</div>
    <div class="text">This is Section {{ sectionId }} of {{ pageName }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SectionComponent',
  props: {
    sectionId: {
      type: [Number, String],
      required: true
    },
    pageName: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.text{
    font-family: sans-serif;
    font-size: 24px;
    font-weight: bold;
}
.decoration{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:20px;
    padding:30px;
}
</style>
