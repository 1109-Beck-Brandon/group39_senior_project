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
import Course1ModuleOne from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/Module1.vue'
import Course1AttacksDefence from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/AttacksDefence.vue';
import Course1ModuleSE from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/SocialEngineeringModule.vue'
import Course1OSIModel from  '../views/CoursePages/1-IntroToCybersecurity/CourseModules/ModuleOSI.vue'
import Course1LabModule from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/labModule1.vue'
import Course1LabModule2 from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/labModule2.vue'
import Course1QuizLab from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/QuizLab.vue'
import Course1Jobs from '../views/CoursePages/1-IntroToCybersecurity/CourseModules/JobsAtCyber.vue'

import CourseSample202 from '../views/CoursePages/2-SampleCourse202/SampleCourse2.vue'
import CourseSample303 from '../views/CoursePages/3-SampleCourse303/SampleCourse3.vue'

//new pages, making a new profile redirects you to diff onboarding page before your profile page
import TeacherOnboarding from "@/views/OnboardingPages/TeacherOnboarding.vue";
import StudentOnboarding from "@/views/OnboardingPages/StudentOnboarding.vue";
import UserOnboarding from "@/views/OnboardingPages/UserOnboarding.vue";
//new gradebook page for teachers and classroom page for students
import GradeBook from "@/views/GradeBook.vue";
import StudentClassroom from "@/views/ClassroomPages/StudentClassroom.vue";

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
  { path: "/course/intro-to-cybersecurity/moduleOne", component: Course1ModuleOne}, //Course 1 Module 1
  { path: "/course/intro-to-cybersecurity/AttacksDefensemodule", component: Course1AttacksDefence}, //Course 1 Attacks/Defenses Module
  { path: "/course/intro-to-cybersecurity/SEmodule", component: Course1ModuleSE}, //Course 1 Social Engineering Module
  { path: "/course/intro-to-cybersecurity/OSImodule", component: Course1OSIModel}, //Course 1 OSI Model Module
  { path: "/course/intro-to-cybersecurity/labModule", component: Course1LabModule}, //Course 1 Lab Module 1
  { path: "/course/intro-to-cybersecurity/labModule2", component: Course1LabModule2}, //Course 1 Lab Module 2
  { path: "/course/intro-to-cybersecurity/quizLab", component: Course1QuizLab}, //Course 1 Lab Module 3
  { path: "/course/intro-to-cybersecurity/Jobsmodule", component: Course1Jobs}, //Course 1 Jobs Module

  //new path to teacher's Onboarding Page
  {
    path: '/teacherOnboarding',
    name: 'TeacherOnboarding', //changed the name property
    component: TeacherOnboarding
  }, 

  //new path to student's Onboarding Page
  {
    path: '/studentOnboarding',
    name: 'StudentOnboarding', 
    component: StudentOnboarding
  },
  //new path to normal User's Onboarding Page
  {
    path: '/userOnboarding',
    name: 'UserOnboarding', 
    component: UserOnboarding
  },
  //new path to teacher's gradebook page
  {
    path: '/gradebook',
    name: 'GradeBook', 
    component: GradeBook
  },
  //new path to student's classroom page
  {
    path: '/studentClassroom',
    name: 'StudentClassroom', 
    component: StudentClassroom
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
