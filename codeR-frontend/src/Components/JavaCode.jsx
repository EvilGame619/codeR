import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api.jsx";

export default function JavaCode(){

    const location = useLocation();
    const [javaCode,setJavaCode] = useState("");
    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const id = param.get("id");
        const uri = "/code/"+id;
        api.get(uri)
        .then((response) => setJavaCode(response.data))
        .catch((reject)=> console.log(reject));
    },[])

    return <div>
        {javaCode}
    </div>
}