<template>
  <div class="sidebar">
    <div class="section-container">
      <div class="Menu">Menu</div>
      <router-link
        v-for="n in 4"
        :key="n"
        :to="{ name: currentPage + 'Section', params: { SectionId: n } }"
        class="section"
        :class="{ active: isActive(n) }"
      >
        Section {{ n }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'SidebarMenuComponent',
  setup() {
    const route = useRoute()

    // Determine current page for the sidebar links
    const currentPage = computed(() => {
      if (!route.name) return 'Page_1'
      const name = route.name.toString()
      //it get base on url and return the name
      //if the url display page_1 it get name Page_1
      if (name.startsWith('Page_1')) return 'Page_1'
      if (name.startsWith('Page_2')) return 'Page_2'
      if (name.startsWith('Page_3')) return 'Page_3'
      return 'Page_1'
    })

    // Active section highlighting
    const isActive = (sectionId) => {
      return Number(route.params.SectionId) === sectionId
    }

    return { currentPage, isActive }
  },
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 500px;
}
.Menu {
  border: 1px solid black;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  color: black;
  text-decoration: none;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section {
  border: 1px solid black;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  color: black;
  text-decoration: none;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.section.active {
  background-color: azure;
}
.section-container {
  display: flex;
  flex-direction: column;
}
</style>
