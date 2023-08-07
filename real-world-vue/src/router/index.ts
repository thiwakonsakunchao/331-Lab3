import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import ShitView from '../views/ShitView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/StudentListView.vue'
import EventDetailView from '../views/EventDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '2')})

    },
    {
      path: '/about',
      name: 'about',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView
    },
    {
      path: '/shit',
      name: 'shit',
      component: ShitView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/event/:id',
      name: 'event-detail',
      component: EventDetailView,
      props: true
      
    }
    
  ]
})

export default router
