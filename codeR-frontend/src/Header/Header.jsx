import { IconCode, IconSettings } from "@tabler/icons-react";
import Navbar from "./Navbar";
import DarkModeToggle from "../Components/DarkMode";
import api from "../api";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../Authentication/Login";

function Header() {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    let uri = "/auth/logout";
    api.get(uri)
    .then(()=> navigate("/auth/login")
  )
    .catch(()=> console.log("logout failed"));
  }

  return (
    <div className="bg-mine-shaft-100 dark:bg-mine-shaft-800 flex flex-col sm:flex-row items-center justify-between px-5 py-3 sm:h-[10vh] w-full gap-3 sm:gap-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <IconCode className="h-10 w-10 sm:h-12 sm:w-12" stroke={2} />
        <div className="text-xl sm:text-2xl hover:shadow-lg hover:shadow-yellow-600 duration-300 dark:text-mine-shaft-300 font-bold text-mine-shaft-500">
          code<span className="text-bright-sun-500">R</span>
        </div>
      </div>

      {/* Navbar (centered on small screens) */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        <Navbar />
      </div>

      {/* Settings + Theme toggle */}
      <div className="flex gap-2 items-center">
        <DarkModeToggle />
        <button className="  px-3 py-2 rounded-lg bg-red-600" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
