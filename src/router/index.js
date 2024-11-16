import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/UserLogin.vue'; // Import Login Page
import ProfileCreate from '../views/ProfileCreate.vue'; //Import Profile Creation Page
import CourseSelect from '../views/CourseSelect.vue'; //Import Course Selection Page
import TeacherView from '../views/TeacherView.vue'; //Import Teacher View Page

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  //Added login page
  { path: '/login',
    component: UserLogin 
  },
  //Added Profile Creation
  { path: '/createProfile',
    component: ProfileCreate
  },
  //Added Course Selection
  { path: '/courseSelect',
    component: CourseSelect
  },
  //Add Course Page
  {
    path: '/course/:courseName',
    name: 'CoursePage',
    component: () => import('../views/CoursePage.vue'),
    props: true
  },
  //Add Teacher View
  {
    path: '/teacherView',
    component: TeacherView
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
