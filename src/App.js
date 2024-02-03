import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/commen/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import OpenRoute from "./components/core/auth/OpenRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Error from './pages/Error'
import Dashboard from "./pages/Dashboard";
import MyProfile from './components/core/DashboardCompo/MyProfile'
import { Setting } from "./components/core/DashboardCompo/Setting/Setting";
import EnrolledCourses from "./components/core/DashboardCompo/EnrolledCourses";
import Cart from "./components/core/DashboardCompo/cartCompo/Cart"
import AddCourse from "./components/core/DashboardCompo/AddCourse";
import MyCourses from "./components/core/DashboardCompo/MyCourses";
import { EditCourse } from "./components/core/DashboardCompo/EditCourse/EditCourse";
import { Catalog } from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/DashboardCompo/IndtructorDash/InstructorDashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import { useSelector } from "react-redux";


function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900">
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/category/:categoryName" element={<Catalog/>} />
      <Route path="/course/:courseId" element={<CourseDetail/>} />
      <Route path ='login' element={<OpenRoute><Login/></OpenRoute>}/>
      
      <Route path ='signup' element={<OpenRoute><Signup/></OpenRoute>}/>
      <Route path='verify-email' element={ <OpenRoute><VerifyEmail/></OpenRoute>}></Route>
      <Route path ='forgot-password' element={ <OpenRoute><ForgotPassword/></OpenRoute>}/>
      <Route path="update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}></Route>  
      <Route path="about" element={<AboutUs/>} ></Route>
      <Route path="contact" element={<ContactUs/>}></Route>
      <Route path="*" element={<Error/>}></Route>

      <Route element={
        // <PrivateRoute>
        //    <Dashboard/>
        // </PrivateRoute>
        <Dashboard/>
     }>
         <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
         <Route path="/dashboard/setting" element={<Setting/>}/>
       
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
         <Route path="/dashboard/cart" element = {<Cart/>}/>
          
         <Route path="/dashboard/add-course" element = {<AddCourse/>}/>
         <Route path="/dashboard/my-courses" element = {<MyCourses/>}/>
         <Route path="/dashboard/edit-course/:courseId" element = {<EditCourse/>}/>
         {/* /dashboard/instructor */}
         <Route path="/dashboard/instructor" element = {<InstructorDashboard/>}/>
      </Route>

      <Route element ={<ViewCourse/>}
      >
      <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element = {<VideoDetails/>}/>
      </Route>
     </Routes>

    </div>
  );
}

export default App;
