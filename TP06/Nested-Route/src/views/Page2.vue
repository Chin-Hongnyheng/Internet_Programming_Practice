<template>
    <div class="page-container">
        <span class="page2">Welcome to Page 2</span>
        <SectionComponent v-if="sectionId" :section-id="sectionId" page-name="Page 2" />
    </div>
</template>
<script>
import SectionComponent from '@/component/SectionComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue'

export default{
    name: 'Page2',
    setup(){
        const route = useRoute()

        const sectionId = computed(() => route.params.SectionId)
        return { sectionId }
    },
    components:{
        SectionComponent,
    },
}
</script>
<style scoped>
.page2{
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