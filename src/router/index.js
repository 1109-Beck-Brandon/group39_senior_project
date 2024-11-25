import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/UserLogin.vue'; // Import Login Page
import ProfileCreate from '../views/ProfileCreate.vue'; //Import Profile Creation Page
import CourseSelect from '../views/CourseSelect.vue'; //Import Course Selection Page
import TeacherView from '../views/TeacherView.vue'; //Import Teacher View Page
import ReviewPage from '../views/ReviewPage.vue'; //Import Review Page
import ProfileView from '../views/UserProfile.vue'; //Import Profile View Page
import PasswordReset from '../views/PasswordReset.vue'; //Import Password Reset Page

//These will be an import section for course pages
//Course 1 Content
import CourseIntroToCybersecurity from '../views/CoursePages/1-IntroToCybersecurity/IntroductionToCybersecurityCoursePage.vue'
import Course1LabModule from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/labModule.vue'

import CourseSample202 from '../views/CoursePages/2-SampleCourse202/SampleCourse2.vue'
import CourseSample303 from '../views/CoursePages/3-SampleCourse303/SampleCourse3.vue'

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
  },
  //Add Review Page
  { path: '/reviewPage', 
    name: 'ReviewPage', 
    component: ReviewPage 
  },
  //Add Profile View Page
  {
    path: '/profileView',
    component: ProfileView
  },
  //Add Password Reset Page
  {
    path: '/passwordReset',
    component: PasswordReset
  },
  //These will be all of the course pages
  { path: "/course/intro-to-cybersecurity", name: "IntroToCybersecurity", component: CourseIntroToCybersecurity },
  { path: "/course/sample-202", name: "Sample202", component: CourseSample202 },
  { path: "/course/sample-303", name: "Sample303", component: CourseSample303 },
  // Add more course routes here

  //Course 1 Module Components
  { path: "/course/intro-to-cybersecurity/labModule", component: Course1LabModule},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
