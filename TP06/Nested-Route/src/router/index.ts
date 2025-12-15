import { createRouter, createWebHistory } from 'vue-router'
import Page2 from '@/views/Page2.vue'
import Page3 from '@/views/Page3.vue'
import Page1 from '@/views/Page1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/",
      redirect: '/page1',
    },
    {
      name: "Page_1",
      path: "/page1",
      component: Page1,
      children: [
        {
          name: "Page_1Section",
          path: 'sections/:SectionId',
          component: () => import('@/component/SectionComponent.vue'),
        }
      ],
    },
    {
      name: "Page_2",
      path: "/page2",
      component: Page2,
      children:[
        {
          name: "Page_2Section",
          path: 'sections/:SectionId',
          component: () => import('@/component/SectionComponent.vue')
        }
      ]
    },
    {
      name: "Page_3",
      path: "/page3",
      component: Page3,
      children:[
        {
          name: "Page_3Section",
          path: 'sections/:SectionId',
          component: () => import('@/component/SectionComponent.vue')
        }
      ]
    }
  ],
})

export default router
