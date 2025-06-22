import { IconCode, IconSettings } from "@tabler/icons-react";
import Navbar from "./Navbar";
import DarkModeToggle from "../Components/DarkMode";

function Header(){
    return <div className="bg-mine-shaft-100 dark:bg-mine-shaft-800 flex items-center justify-between px-5 h-[10vh] w-full">
        <div className="flex items-center justify-center gap-1">
            <IconCode className="h-12 w-12" stroke={2}/>
            <div className="text-2xl hover:shadow-lg hover:shadow-yellow-600 duration-300 dark:text-mine-shaft-300 font-bold text-mine-shaft-500">code<span className="text-bright-sun-500">R</span></div>
        </div>
        <div><Navbar/></div>
        <div className="flex gap-2 items-center">
            <DarkModeToggle/>
            <IconSettings className="h-8 w-8"/>
        </div>
    </div>
}

export default Header;