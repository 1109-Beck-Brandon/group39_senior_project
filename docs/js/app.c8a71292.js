(function(){"use strict";var e={9970:function(e,t,r){var o=r(5130),a=r(6768);const n={id:"app"};function s(e,t,r,o,s,l){const u=(0,a.g2)("router-link"),i=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.CE)("div",n,[(0,a.Lk)("nav",null,[(0,a.bF)(u,{to:"/"},{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.eW)("Home")]))),_:1}),t[9]||(t[9]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/about"},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.eW)("About")]))),_:1}),t[10]||(t[10]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/login"},{default:(0,a.k6)((()=>t[2]||(t[2]=[(0,a.eW)("Login")]))),_:1}),t[11]||(t[11]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/createProfile"},{default:(0,a.k6)((()=>t[3]||(t[3]=[(0,a.eW)("Create Profile")]))),_:1}),t[12]||(t[12]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/courseSelect"},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)("Select Course")]))),_:1}),t[13]||(t[13]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/profileView"},{default:(0,a.k6)((()=>t[5]||(t[5]=[(0,a.eW)("View Profile")]))),_:1}),t[14]||(t[14]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/teacherView"},{default:(0,a.k6)((()=>t[6]||(t[6]=[(0,a.eW)("Teacher View")]))),_:1}),t[15]||(t[15]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/reviewPage"},{default:(0,a.k6)((()=>t[7]||(t[7]=[(0,a.eW)("Reviews")]))),_:1}),t[16]||(t[16]=(0,a.eW)(" | ")),(0,a.bF)(u,{to:"/passwordReset"},{default:(0,a.k6)((()=>t[8]||(t[8]=[(0,a.eW)("Reset Password")]))),_:1})]),(0,a.bF)(i)])}var l=r(4373);const u=l.A.create({baseURL:"http://localhost:5000/api",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}});var i={getUsers(){return u.get("/users")},login(e){return u.post("/login",e)},createProfile(e){return u.post("/auth/createProfile",e)}},d={data(){return{message:""}},methods:{async fetchData(){try{const e=await i.getData();this.message=e.data.message}catch(e){console.error("Error fetching data:",e)}}}},c=r(1241);const m=(0,c.A)(d,[["render",s]]);var f=m,p=(r(5524),r(5790)),b=(0,p.$N)();async function h(){const e=await r.e(53).then(r.t.bind(r,8874,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var k=r(1387),g=r(3524),v=r(2598),_=r(4605),w=r(7254),L=r(7294),y=r(7505),C=r(373);const F={class:"home"};function P(e,t,r,o,n,s){const l=(0,a.g2)("HelloWorld"),u=(0,a.g2)("v-list-item-content");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",F,[(0,a.bF)(l,{msg:"Welcome to Your Vue.js App"})]),(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"}),(0,a.bF)(C.e,{width:"300"},{default:(0,a.k6)((()=>[(0,a.bF)(_.x8,null,{default:(0,a.k6)((()=>[t[2]||(t[2]=(0,a.Lk)("h2",null,"Resources",-1)),(0,a.bF)(w.g,null,{default:(0,a.k6)((()=>[(0,a.bF)(u,null,{default:(0,a.k6)((()=>[(0,a.bF)(L.U,null,{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.eW)("Resource Description")]))),_:1}),(0,a.bF)(y.w,{class:"wrap-text"},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.eW)(" This section will be for resources that users can click on to further reinforce their learning. ")]))),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})],64)}var W=r(4232),S=r(3813),E=r(6756),V=r(5526),j=r(5126);const I=["href"];function N(e,t,o,n,s,l){return(0,a.uX)(),(0,a.Wv)(S.I,null,{default:(0,a.k6)((()=>[(0,a.bF)(E.L,{class:"text-center"},{default:(0,a.k6)((()=>[(0,a.bF)(V.B,{cols:"12"},{default:(0,a.k6)((()=>[(0,a.bF)(j.y,{src:r(4100),class:"my-3",contain:"",height:"225"},null,8,["src"])])),_:1}),(0,a.bF)(V.B,{class:"mb-4"},{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.Lk)("h1",{class:"display-2 font-weight-bold mb-3"}," Welcome to the Cybersecurity Learning Platform ",-1),(0,a.Lk)("p",{class:"subheading font-weight-regular"},[(0,a.eW)(" This website is here to help educators and individuals who want "),(0,a.Lk)("br"),(0,a.eW)("to learn more about the field of cybersecurity! ")],-1)]))),_:1}),(0,a.bF)(V.B,{class:"mb-5",cols:"12"},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.Lk)("h2",{class:"headline font-weight-bold mb-5"}," What's next? ",-1),(0,a.Lk)("p",{class:"subheading font-weight-regular"}," Website maintenance/building, adding lessons, and more! ",-1)]))),_:1}),(0,a.bF)(V.B,{class:"mb-5",cols:"12"},{default:(0,a.k6)((()=>[t[2]||(t[2]=(0,a.Lk)("h2",{class:"headline font-weight-bold mb-5"}," Important Links ",-1)),(0,a.bF)(E.L,{justify:"center"},{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.importantLinks,((e,t)=>((0,a.uX)(),(0,a.CE)("a",{key:t,href:e.href,class:"subheading mx-3",target:"_blank"},(0,W.v_)(e.text),9,I)))),128))])),_:1})])),_:1})])),_:1})])),_:1})}var x={name:"HelloWorld",data:()=>({importantLinks:[{text:"Made with Vuetify",href:"https://madewithvuejs.com/vuetify"}]})};const D=(0,c.A)(x,[["render",N]]);var R=D,A={name:"HomeView",components:{HelloWorld:R}};const X=(0,c.A)(A,[["render",P],["__scopeId","data-v-00f3a104"]]);var O=X;const T={class:"login"},U={key:0,class:"error"},B={class:"new-user"},J={class:"forgot-password"};function K(e,t,r,n,s,l){const u=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",T,[t[8]||(t[8]=(0,a.Lk)("h1",null,"Login",-1)),(0,a.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>l.handleLogin&&l.handleLogin(...e)),["prevent"]))},[(0,a.Lk)("div",null,[t[3]||(t[3]=(0,a.Lk)("label",{for:"username"},"Username: ",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"username","onUpdate:modelValue":t[0]||(t[0]=e=>s.username=e),required:""},null,512),[[o.Jo,s.username]])]),(0,a.Lk)("div",null,[t[4]||(t[4]=(0,a.Lk)("label",{for:"password"},"Password: ",-1)),(0,a.bo)((0,a.Lk)("input",{type:"password",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[o.Jo,s.password]])]),t[5]||(t[5]=(0,a.Lk)("button",{type:"submit"},"Login",-1))],32),s.error?((0,a.uX)(),(0,a.CE)("p",U,(0,W.v_)(s.error),1)):(0,a.Q3)("",!0),(0,a.Lk)("p",B,[(0,a.bF)(u,{to:"/createProfile"},{default:(0,a.k6)((()=>t[6]||(t[6]=[(0,a.eW)("New user? Create a profile")]))),_:1})]),(0,a.Lk)("p",J,[(0,a.bF)(u,{to:"/passwordReset"},{default:(0,a.k6)((()=>t[7]||(t[7]=[(0,a.eW)("Forgot Password? ")]))),_:1})])]),(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1})],64)}r(4114);var q={name:"UserLogin",data(){return{username:"",password:"",error:null}},methods:{handleLogin(){"user"===this.username&&"pass"===this.password?(this.error=null,this.$router.push("/")):this.error="Invalid credentials. Please try again."}}};const z=(0,c.A)(q,[["render",K],["__scopeId","data-v-7b3e429a"]]);var $=z,M=r(554),G=r(1560),H=r(9865),Q=r(4750);function Y(e,t,r,n,s,l){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(S.I,{class:"pa-5"},{default:(0,a.k6)((()=>[t[5]||(t[5]=(0,a.Lk)("h2",null,"Create a Profile",-1)),(0,a.bF)(G.n,{onSubmit:(0,o.D$)(l.handleSubmit,["prevent"])},{default:(0,a.k6)((()=>[(0,a.bF)(Q.W,{label:"Create Username",modelValue:s.formData.username,"onUpdate:modelValue":t[0]||(t[0]=e=>s.formData.username=e),required:""},null,8,["modelValue"]),(0,a.bF)(Q.W,{label:"Email Address",modelValue:s.formData.email,"onUpdate:modelValue":t[1]||(t[1]=e=>s.formData.email=e),type:"email",required:""},null,8,["modelValue"]),(0,a.bF)(Q.W,{label:"Password",modelValue:s.formData.password,"onUpdate:modelValue":t[2]||(t[2]=e=>s.formData.password=e),type:"password",required:""},null,8,["modelValue"]),(0,a.bF)(H.d4,{label:"Role",items:s.roles,modelValue:s.formData.role,"onUpdate:modelValue":t[3]||(t[3]=e=>s.formData.role=e),required:""},null,8,["items","modelValue"]),(0,a.bF)(M.D,{color:"primary",type:"submit"},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)("Submit")]))),_:1})])),_:1},8,["onSubmit"])])),_:1}),(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1})],64)}var Z={data(){return{formData:{username:"",email:"",password:"",role:""},roles:["Student","Teacher","Individual"]}},methods:{async handleSubmit(){try{const e=await i.createProfile(this.formData);this.message=e.data.message,console.log("Profile Created:",e.data),this.$router.push("/login")}catch(e){e.response&&409===e.response.status?console.error("Username or Email already exists:",e):console.error("Error creating profile:",e),console.error("Error creating profile:",e)}}}};const ee=(0,c.A)(Z,[["render",Y],["__scopeId","data-v-3b05e393"]]);var te=ee,re=r(9336);const oe={class:"course-scroll"},ae={class:"course-content"},ne={class:"progress-container"},se={class:"progress-text"};function le(e,t,r,o,n,s){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(S.I,{fluid:""},{default:(0,a.k6)((()=>[t[1]||(t[1]=(0,a.Lk)("h2",{class:"page-title"},"Select a Course",-1)),(0,a.Lk)("div",oe,[(0,a.bF)(E.L,{class:"course-row","no-gutters":""},{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.courses,(e=>((0,a.uX)(),(0,a.Wv)(V.B,{key:e.name,class:"course-square",cols:"auto"},{default:(0,a.k6)((()=>[(0,a.Lk)("div",ae,[(0,a.Lk)("h3",null,(0,W.v_)(e.name),1),(0,a.Lk)("p",null,(0,W.v_)(e.description),1),(0,a.Lk)("div",ne,[(0,a.Lk)("p",se,"Progress: "+(0,W.v_)(e.progress)+"%",1),(0,a.bF)(re.Z,{value:"50",color:"blue",height:"20"}),(0,a.bF)(M.D,{color:"primary",onClick:t=>s.goToCoursePage(e.name)},{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.eW)(" Go to Course ")]))),_:2},1032,["onClick"])])])])),_:2},1024)))),128))])),_:1})])])),_:1}),(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1})],64)}var ue={data(){return{courses:[{name:"Introduction to Cybersecurity",description:"This is the introduction course to cybersecurity, more to come soon.",progress:0},{name:"Sample Course 202",description:"This is a sample course to test the slide bar",progress:0},{name:"Sample Course 303",description:"This is a sample course to test the slide bar",progress:0},{name:"Sample Course 404",description:"This is a sample course to test the slide bar",progress:0},{name:"Sample Course 505",description:"This is a sample course to test the slide bar",progress:0},{name:"Sample Course 606",description:"This is a sample course to test the slide bar",progress:0}]}},methods:{goToCoursePage(e){this.$router.push({name:"CoursePage",params:{courseName:e}})}}};const ie=(0,c.A)(ue,[["render",le],["__scopeId","data-v-17b73d78"]]);var de=ie,ce=r(8374);const me={key:0},fe={key:1};function pe(e,t,r,o,n,s){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1}),(0,a.bF)(S.I,{fluid:""},{default:(0,a.k6)((()=>[(0,a.bF)(E.L,null,{default:(0,a.k6)((()=>[(0,a.bF)(V.B,{cols:"3"},{default:(0,a.k6)((()=>[(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>[t[0]||(t[0]=(0,a.Lk)("h3",null,"Classrooms",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.classrooms,((e,t)=>((0,a.uX)(),(0,a.Wv)(M.D,{key:t,block:"",class:"mb-2",onClick:t=>s.selectClassroom(e)},{default:(0,a.k6)((()=>[(0,a.eW)((0,W.v_)(e.name),1)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),(0,a.bF)(V.B,{cols:"6"},{default:(0,a.k6)((()=>[t[9]||(t[9]=(0,a.Lk)("h1",null,"Teacher View",-1)),(0,a.bF)(ce.J,{class:"pa-3 mb-4"},{default:(0,a.k6)((()=>[t[1]||(t[1]=(0,a.Lk)("h3",null,"Students",-1)),(0,a.bF)(E.L,null,{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.selectedClassroomStudents,((e,t)=>((0,a.uX)(),(0,a.Wv)(M.D,{key:t,class:"mx-2",onClick:t=>s.selectStudent(e)},{default:(0,a.k6)((()=>[(0,a.eW)((0,W.v_)(e.firstName)+" "+(0,W.v_)(e.lastName),1)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>[t[8]||(t[8]=(0,a.Lk)("h3",null,"Student Information",-1)),n.selectedStudent?((0,a.uX)(),(0,a.CE)("div",me,[(0,a.Lk)("p",null,[t[2]||(t[2]=(0,a.Lk)("strong",null,"First Name:",-1)),(0,a.eW)(" "+(0,W.v_)(n.selectedStudent.firstName),1)]),(0,a.Lk)("p",null,[t[3]||(t[3]=(0,a.Lk)("strong",null,"Last Name:",-1)),(0,a.eW)(" "+(0,W.v_)(n.selectedStudent.lastName),1)]),(0,a.Lk)("p",null,[t[4]||(t[4]=(0,a.Lk)("strong",null,"Enrolled Courses:",-1)),(0,a.eW)(" "+(0,W.v_)(n.selectedStudent.enrolledCourses.join(", ")),1)]),(0,a.Lk)("p",null,[t[5]||(t[5]=(0,a.Lk)("strong",null,"Completed Courses:",-1)),(0,a.eW)(" "+(0,W.v_)(n.selectedStudent.completedCourses.join(", ")),1)]),(0,a.Lk)("p",null,[t[6]||(t[6]=(0,a.Lk)("strong",null,"Average Grades:",-1)),(0,a.eW)(" "+(0,W.v_)(n.selectedStudent.averageGrades),1)])])):((0,a.uX)(),(0,a.CE)("div",fe,t[7]||(t[7]=[(0,a.Lk)("p",null,"Select a student to view their information",-1)])))])),_:1})])),_:1}),(0,a.bF)(V.B,{cols:"3"},{default:(0,a.k6)((()=>[(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>[t[13]||(t[13]=(0,a.Lk)("h3",null,"Actions",-1)),(0,a.bF)(M.D,{block:"",class:"mb-2"},{default:(0,a.k6)((()=>t[10]||(t[10]=[(0,a.eW)("Edit Grades")]))),_:1}),(0,a.bF)(M.D,{block:"",class:"mb-2"},{default:(0,a.k6)((()=>t[11]||(t[11]=[(0,a.eW)("Message Student")]))),_:1}),(0,a.bF)(M.D,{block:""},{default:(0,a.k6)((()=>t[12]||(t[12]=[(0,a.eW)("View Progress")]))),_:1})])),_:1})])),_:1})])),_:1})])),_:1})],64)}var be={name:"TeacherView",data(){return{classrooms:[{name:"Classroom 1"},{name:"Classroom 2"},{name:"Classroom 3"}],students:[{firstName:"John",lastName:"Doe",classroom:"Classroom 1",enrolledCourses:["Introduction to Cybersecurity","Sample Course 2"],completedCourses:["None"],averageGrades:"A"},{firstName:"Jane",lastName:"Smith",classroom:"Classroom 2",enrolledCourses:["Introduction to Cybersecurity","Sample Course 4"],completedCourses:["Sample Course 3"],averageGrades:"B+"}],selectedClassroomStudents:[],selectedStudent:null}},methods:{selectClassroom(e){this.selectedClassroomStudents=this.students.filter((t=>t.classroom===e.name)),this.selectedStudent=null},selectStudent(e){this.selectedStudent=e}}};const he=(0,c.A)(be,[["render",pe],["__scopeId","data-v-63d0e966"]]);var ke=he;const ge={class:"reviewPage"},ve={class:"reviews"},_e={key:0},we=["src"];function Le(e,t,r,n,s,l){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1}),(0,a.Lk)("div",ge,[t[5]||(t[5]=(0,a.Lk)("h1",null,"Review Page",-1)),(0,a.Lk)("form",{onSubmit:t[1]||(t[1]=(0,o.D$)(((...e)=>l.submitReview&&l.submitReview(...e)),["prevent"]))},[(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.newReview=e),placeholder:"Write a review...",rows:"5"},null,512),[[o.Jo,s.newReview]]),t[2]||(t[2]=(0,a.Lk)("button",{type:"submit"},"Submit Review",-1))],32),(0,a.Lk)("div",ve,[t[4]||(t[4]=(0,a.Lk)("h2",null,"Reviews:",-1)),0===s.reviews.length?((0,a.uX)(),(0,a.CE)("div",_e,t[3]||(t[3]=[(0,a.Lk)("p",null,"What a shame.... No one gives a damn about our website (crying emoji)",-1)]))):(0,a.Q3)("",!0),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.reviews,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:"review-item"},[(0,a.Lk)("img",{src:s.imageSrc,alt:"Review User",class:"review-thumbnail"},null,8,we),(0,a.Lk)("p",null,(0,W.v_)(e),1)])))),128))])])],64)}var ye=r.p+"img/cartoon-squirrel-drawing-v0-z8txear3x4hb1.2d5a631d.jpg",Ce={data(){return{reviews:["Yooooooooo I finaly can hacck thanks guys."],newReview:"",imageSrc:ye}},methods:{submitReview(){this.newReview.trim()&&(this.reviews.push(this.newReview.trim()),this.newReview="")}}};const Fe=(0,c.A)(Ce,[["render",Le],["__scopeId","data-v-01fa2f8e"]]);var Pe=Fe;const We={key:0};function Se(e,t,r,o,n,s){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1}),(0,a.bF)(S.I,{fluid:""},{default:(0,a.k6)((()=>[(0,a.bF)(E.L,null,{default:(0,a.k6)((()=>[(0,a.bF)(V.B,{cols:"3"},{default:(0,a.k6)((()=>[(0,a.bF)(ce.J,{class:"pa-3 mb-4"},{default:(0,a.k6)((()=>[(0,a.bF)(E.L,null,{default:(0,a.k6)((()=>[(0,a.bF)(V.B,{cols:"6"},{default:(0,a.k6)((()=>[(0,a.bF)(j.y,{src:n.user.profilePicture,class:"rounded-circle",contain:"",height:"100"},null,8,["src"])])),_:1}),(0,a.bF)(V.B,{cols:"6",class:"user-info-text"},{default:(0,a.k6)((()=>[(0,a.Lk)("p",null,[t[0]||(t[0]=(0,a.Lk)("strong",null,"Username:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.username),1)]),(0,a.Lk)("p",null,[t[1]||(t[1]=(0,a.Lk)("strong",null,"Email:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.email),1)]),(0,a.Lk)("p",null,[t[2]||(t[2]=(0,a.Lk)("strong",null,"Full Name:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.fullName),1)]),(0,a.Lk)("p",null,[t[3]||(t[3]=(0,a.Lk)("strong",null,"Member Since:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.membershipDuration),1)])])),_:1})])),_:1})])),_:1}),(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>[t[6]||(t[6]=(0,a.Lk)("h3",null,"Role",-1)),(0,a.Lk)("p",null,[t[4]||(t[4]=(0,a.Lk)("strong",null,"Role:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.role),1)]),"Student"===n.user.role?((0,a.uX)(),(0,a.CE)("p",We,[t[5]||(t[5]=(0,a.Lk)("strong",null,"Class:",-1)),(0,a.eW)(" "+(0,W.v_)(n.user.class),1)])):(0,a.Q3)("",!0)])),_:1})])),_:1}),(0,a.bF)(V.B,{cols:"9"},{default:(0,a.k6)((()=>[t[11]||(t[11]=(0,a.Lk)("h1",null,"User Profile",-1)),(0,a.bF)(ce.J,{class:"pa-3 mb-4"},{default:(0,a.k6)((()=>[t[9]||(t[9]=(0,a.Lk)("h3",null,"Currently Enrolled Courses",-1)),(0,a.bF)(E.L,null,{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.courses,((e,r)=>((0,a.uX)(),(0,a.Wv)(V.B,{key:r,cols:"4"},{default:(0,a.k6)((()=>[(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>[(0,a.Lk)("p",null,[t[7]||(t[7]=(0,a.Lk)("strong",null,"Course Name:",-1)),(0,a.eW)(" "+(0,W.v_)(e.name),1)]),(0,a.Lk)("p",null,[t[8]||(t[8]=(0,a.Lk)("strong",null,"Progress:",-1)),(0,a.eW)(" "+(0,W.v_)(e.progress)+"%",1)])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1}),(0,a.bF)(ce.J,{class:"pa-3"},{default:(0,a.k6)((()=>t[10]||(t[10]=[(0,a.Lk)("h3",null,"Course Progress Chart",-1),(0,a.Lk)("canvas",{id:"progressChart"},null,-1)]))),_:1})])),_:1})])),_:1})])),_:1})],64)}var Ee=r(6912);Ee.t1.register(...Ee.$L);var Ve={name:"UserProfileView",data(){return{user:{profilePicture:"https://via.placeholder.com/100",username:"exampleUser",email:"user@example.com",fullName:"John Doe",membershipDuration:"2 years",role:"Student",class:"Classroom 1"},courses:[{name:"Introduction to Cybersecurity",progress:90},{name:"Sample Course 2",progress:75},{name:"Sample Course 3",progress:30}]}},mounted(){this.createChart()},methods:{createChart(){const e=document.getElementById("progressChart").getContext("2d");new Ee.t1(e,{type:"bar",data:{labels:this.courses.map((e=>e.name)),datasets:[{label:"Progress (%)",data:this.courses.map((e=>e.progress)),backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1}]},options:{scales:{y:{beginAtZero:!0,max:100}}}})}}};const je=(0,c.A)(Ve,[["render",Se],["__scopeId","data-v-2a7d50bc"]]);var Ie=je,Ne=r(1606),xe=r(697);function De(e,t,r,o,n,s){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(v.L,{class:"rounded rounded-md"},{default:(0,a.k6)((()=>[(0,a.bF)(g.z,{color:"surface-variant",title:"Cybersecurity Learning Platform"})])),_:1}),(0,a.bF)(S.I,{class:"d-flex align-center justify-center",style:{height:"100vh","margin-top":"-20vh"}},{default:(0,a.k6)((()=>[(0,a.bF)(ce.J,{class:"pa-5","max-width":"500"},{default:(0,a.k6)((()=>[(0,a.bF)(Ne.r,null,{default:(0,a.k6)((()=>t[3]||(t[3]=[(0,a.eW)("Password Reset")]))),_:1}),(0,a.bF)(xe.O,null,{default:(0,a.k6)((()=>[(0,a.bF)(G.n,null,{default:(0,a.k6)((()=>[(0,a.bF)(Q.W,{label:"Email",type:"email",placeholder:"Enter your email",modelValue:n.email,"onUpdate:modelValue":t[0]||(t[0]=e=>n.email=e),outlined:"",dense:""},null,8,["modelValue"]),(0,a.bF)(Q.W,{label:"New Password",type:"password",placeholder:"Enter new password",modelValue:n.newPassword,"onUpdate:modelValue":t[1]||(t[1]=e=>n.newPassword=e),outlined:"",dense:""},null,8,["modelValue"]),(0,a.bF)(Q.W,{label:"Confirm Password",type:"password",placeholder:"Confirm new password",modelValue:n.confirmPassword,"onUpdate:modelValue":t[2]||(t[2]=e=>n.confirmPassword=e),outlined:"",dense:""},null,8,["modelValue"]),(0,a.bF)(M.D,{color:"primary",block:"",onClick:s.handleReset},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)(" Reset Password ")]))),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1})],64)}var Re={data(){return{email:"",newPassword:"",confirmPassword:""}},methods:{handleReset(){this.newPassword===this.confirmPassword?alert("Password reset link sent (placeholder functionality)."):alert("Passwords do not match.")}}};const Ae=(0,c.A)(Re,[["render",De],["__scopeId","data-v-5399018e"]]);var Xe=Ae;const Oe=[{path:"/",name:"home",component:O},{path:"/about",name:"about",component:()=>r.e(594).then(r.bind(r,5900))},{path:"/login",component:$},{path:"/createProfile",component:te},{path:"/courseSelect",component:de},{path:"/course/:courseName",name:"CoursePage",component:()=>r.e(948).then(r.bind(r,3948)),props:!0},{path:"/teacherView",component:ke},{path:"/reviewPage",name:"ReviewPage",component:Pe},{path:"/profileView",component:Ie},{path:"/passwordReset",component:Xe}],Te=(0,k.aE)({history:(0,k.LA)("/group39_senior_project/"),routes:Oe});var Ue=Te;h(),(0,o.Ef)(f).use(Ue).use(b).mount("#app")},4100:function(e,t,r){e.exports=r.p+"img/CLP-Concept-Logo.8a886ad7.png"}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,o,a,n){if(!o){var s=1/0;for(d=0;d<e.length;d++){o=e[d][0],a=e[d][1],n=e[d][2];for(var l=!0,u=0;u<o.length;u++)(!1&n||s>=n)&&Object.keys(r.O).every((function(e){return r.O[e](o[u])}))?o.splice(u--,1):(l=!1,n<s&&(s=n));if(l){e.splice(d--,1);var i=a();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,a,n]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(o,a){if(1&a&&(o=this(o)),8&a)return o;if("object"===typeof o&&o){if(4&a&&o.__esModule)return o;if(16&a&&"function"===typeof o.then)return o}var n=Object.create(null);r.r(n);var s={};e=e||[null,t({}),t([]),t(t)];for(var l=2&a&&o;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((function(e){s[e]=function(){return o[e]}}));return s["default"]=function(){return o},r.d(n,s),n}}(),function(){r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,o){return r.f[o](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/"+({53:"webfontloader",594:"about"}[e]||e)+"."+{53:"3d99c04d",594:"9d4e34c0",948:"261bade7"}[e]+".js"}}(),function(){r.miniCssF=function(e){return"css/"+e+".e21e86c9.css"}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="group39_senior_project:";r.l=function(o,a,n,s){if(e[o])e[o].push(a);else{var l,u;if(void 0!==n)for(var i=document.getElementsByTagName("script"),d=0;d<i.length;d++){var c=i[d];if(c.getAttribute("src")==o||c.getAttribute("data-webpack")==t+n){l=c;break}}l||(u=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.setAttribute("data-webpack",t+n),l.src=o),e[o]=[a];var m=function(t,r){l.onerror=l.onload=null,clearTimeout(f);var a=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((function(e){return e(r)})),t)return t(r)},f=setTimeout(m.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=m.bind(null,l.onerror),l.onload=m.bind(null,l.onload),u&&document.head.appendChild(l)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p="/group39_senior_project/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,o,a,n){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",r.nc&&(s.nonce=r.nc);var l=function(r){if(s.onerror=s.onload=null,"load"===r.type)a();else{var o=r&&r.type,l=r&&r.target&&r.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+o+": "+l+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=o,u.request=l,s.parentNode&&s.parentNode.removeChild(s),n(u)}};return s.onerror=s.onload=l,s.href=t,o?o.parentNode.insertBefore(s,o.nextSibling):document.head.appendChild(s),s},t=function(e,t){for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var a=r[o],n=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(n===e||n===t))return a}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){a=s[o],n=a.getAttribute("data-href");if(n===e||n===t)return a}},o=function(o){return new Promise((function(a,n){var s=r.miniCssF(o),l=r.p+s;if(t(s,l))return a();e(o,l,null,a,n)}))},a={524:0};r.f.miniCss=function(e,t){var r={948:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=o(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}}(),function(){var e={524:0};r.f.j=function(t,o){var a=r.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var n=new Promise((function(r,o){a=e[t]=[r,o]}));o.push(a[2]=n);var s=r.p+r.u(t),l=new Error,u=function(o){if(r.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var n=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;l.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",l.name="ChunkLoadError",l.type=n,l.request=s,a[1](l)}};r.l(s,u,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,n,s=o[0],l=o[1],u=o[2],i=0;if(s.some((function(t){return 0!==e[t]}))){for(a in l)r.o(l,a)&&(r.m[a]=l[a]);if(u)var d=u(r)}for(t&&t(o);i<s.length;i++)n=s[i],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},o=self["webpackChunkgroup39_senior_project"]=self["webpackChunkgroup39_senior_project"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=r.O(void 0,[504],(function(){return r(9970)}));o=r.O(o)})();
//# sourceMappingURL=app.c8a71292.js.map