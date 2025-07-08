import { IconCode } from "@tabler/icons-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/DashBoard.jsx"
import LandingPage from "./Pages/LandingPage.jsx";
import Signup from "./Authentication/Signup.jsx";
import Login from "./Authentication/Login.jsx";
import OldReviews from "./Pages/OldReviews.jsx";
import JavaCode from "./Components/JavaCode.jsx";
import Review from "./Components/Review.jsx";
import Profile from "./Pages/Profile.jsx";
function App() {
 

  return <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth/signup" element={<Signup/>}/>
      {/* <Route path="" element={<HomePage/>}/> */}
      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/dashboard" element={<HomePage/>}/>
      <Route path="/reports" element={<OldReviews/>}/>
      <Route path="/report/*" element={<JavaCode/>}/>
      <Route path="/report/review/" element={<Review/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
   
  
}

export default App;
