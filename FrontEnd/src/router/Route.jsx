import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useLocation,
  useRoutes,
  Navigate,
} from "react-router-dom";
import Register from "../components/Auth/Register";
import SignIn from "../components/Auth/Login";
import Landing from "../components/Home/landing";
import Email from "../components/Email/EmailVerify";
import ProfileComplate from "../components/profile/ProfileComplate";
import Interestes from "../components/profile/Interestes";
import PageNotFound from "../utils/PageNotFound";
import Reset_Otp_Password from "../components/Auth/Update_Password/Reset_Otp_Password";
import Navbar from "../utils/Header/Navbar";
import { useSelector } from "react-redux";
import UserProfile from "../components/Home/chat_home/UserProfile";
import Chate from "../components/Home/chat_home/Chate";
import UpdateUserProfile from "../components/profile/UpdateUserProfile";
import PageFriends from "../components/Home/chat_home/Friends/PageFriends";
import Footer from "../utils/Footer/Footer";
import EmailSend from "../components/Email/EmailSend";




const RouteAll = () => {
  const userData = useSelector((state) => state.authReducer.authData); 
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const token =localStorage.getItem("token");
  return (
    <BrowserRouter>
        {!userData && <Navbar />}
      <Routes>
        <Route  path="/" element={<Landing />}>
          <Route path="chat" element={<Chate/>}/>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="edit_profile" element={<UpdateUserProfile/>}/>
          <Route path="friends" element={ < PageFriends />}/>
        </Route>
        
      
        {token &&  <Route path={`/interests`} element={<Interestes/>} />}
        {token &&  <Route path="/profileComplete" element={<ProfileComplate/>}/>}
        {!userData &&  <Route path="/Auth/register" element={ <Register /> } />}
        {!userData &&   <Route path="/Auth/login" element={<SignIn/> } /> }

       
         <Route path={`/change_password`} element={<Reset_Otp_Password />}/>
         <Route path={`/verify`} element={<EmailSend />}/>
        <Route path="user/:id/verify/:token" element={<Email/>}/>
        <Route
          path="/*"
          element={
            <>
              <PageNotFound/>
            </>
          }
        />
      </Routes>
      {!userData && <Footer/>}
    </BrowserRouter>
  );
};

export default RouteAll;
