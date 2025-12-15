<template>
  <div class="page-container">
    <span class="page1">Welcome to Page 1</span>
    <!-- if path has sectionId -->
    <SectionComponent v-if="sectionId" :section-id="sectionId" page-name="Page 1"/>
  </div>
</template>

<script>
import SectionComponent from '@/component/SectionComponent.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'Page1',
  components: { SectionComponent }, 
  setup() {
    const route = useRoute()

    const sectionId = computed(() => route.params.SectionId)

    return { sectionId }
  }
}
</script>

<style scoped>
.page1{

    font-family: sans-serif;
    font-size: 36px;
    font-weight: bold;
}
.page-container {
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
