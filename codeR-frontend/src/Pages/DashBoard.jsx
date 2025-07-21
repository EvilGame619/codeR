import Header from "../Header/Header";

import MonacoEditor from "../Components/MonacoEditor.jsx";
import Report from "../Components/Report.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function HomePage(){
    const [code, setCode] = useState(null);

    const location = useLocation();

    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const token = param.get("token");
        if(token){
            localStorage.setItem("token",token);
        }
    },[location])
    return<div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 min-h-screen">
  <Header />
  <div className="flex flex-col lg:flex-row w-[90%] lg:w-[70%] mx-auto mt-5 gap-4 h-[85%]">
    <MonacoEditor language="java" setCodeInParent={setCode} />
    {code !== null && <Report code={code} />}
  </div>
</div>

}

export default HomePage;