import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../Pages/DashBoard.jsx"
import LandingPage from "../Pages/LandingPage.jsx";
import Signup from "../Authentication/Signup.jsx";
import Login from "../Authentication/Login.jsx";
import OldReviews from "../Pages/OldReviews.jsx";
import JavaCode from "../Components/JavaCode.jsx";
import Review from "../Components/Review.jsx";
import Profile from "../Pages/Profile.jsx";
import NotFound from "../Pages/NotFound.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";

export default function Paths(){
    return <BrowserRouter>
    <Routes>
        {/* these all are public paths */}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth/signup" element={<Signup/>}/>
        {/* <Route path="" element={<HomePage/>}/> */}
        <Route path="/auth/login" element={<Login/>}/>

        {/*these all are private paths */}
        <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<HomePage/>}/>
            <Route path="/reports" element={<OldReviews/>}/>
            <Route path="/report/*" element={<JavaCode/>}/>
            <Route path="/report/review/" element={<Review/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/github-review" element={<NotFound/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
}