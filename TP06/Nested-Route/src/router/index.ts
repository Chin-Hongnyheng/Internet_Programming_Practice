import { createRouter, createWebHistory } from 'vue-router'
import Page1 from '@/view/Page1.vue'
import Page2 from '@/view/Page2.vue'
import Page3 from '@/view/Page3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/",
      redirect: Page1,
    },
    {
      name: "Page_1",
      path: "/page1",
      component: Page1,
      
    },
    {
      name: "Page_2",
      path: "/page2",
      component: Page2,
    },
    {
      name: "Page_3",
      path: "/page3",
      component: Page3,
    }
  ],
})

export default router
