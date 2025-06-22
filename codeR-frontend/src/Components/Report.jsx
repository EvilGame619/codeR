import axios from "axios";
import React, { useEffect, useState } from "react"
import api from "../api.jsx";

export default function Report({code}){
    const data = {code:{code}}
    
    const [report, setReport] = useState(null);
    const [checkStyle, setCheckStyle] = useState(null);
    const [pmd, setPMD] = useState(null);
    const [spotBugs, setSpotBugs] = useState(null);
    useEffect(()=>{
        api.post("/code/submitCode",data.code)
        .then(response => {
            setReport(response.data);
            setCheckStyle(response.data.checkStyle);
            setPMD(response.data.pmd);
            setSpotBugs(response.data.spotBugs);
            
        })
        .catch(response=> console.log(response));}
        
        
    ,[code])
    console.log(pmd)
    return <div className={`${report==null? 'hidden':'w-[70%]'} mt-5 flex flex-col rounded-lg gap-3 border-1 items-center duration-500`}>
        {checkStyle!=null && <div className="border-2 overflow-auto h-[33.9%] w-[80%] border-mine-shaft-400 px-5 py-2 rounded-lg"><div className="text-mine-shaft-200 text-2xl text-center mb-2">CheckStyle</div>
                    <div className="flex items-start text-mine-shaft-400 text-lg flex-col">{checkStyle.map((data,index)=>(
                <div key={index} className="mb-4">{data}</div>
                ))}</div>
        </div>}
        {pmd!=null && <div className="border-2 overflow-auto h-[33.9%] w-[80%] border-mine-shaft-400 px-5 py-2 rounded-lg"><div className="text-mine-shaft-200 text-2xl text-center mb-2">PMD</div>
            <div className="flex items-start text-mine-shaft-400 text-lg flex-col">{pmd.map((data,index)=><div key={index}>{data}</div>)}</div>
        </div>}
        {spotBugs!=null && <div className="border-2 overflow-auto h-[33.9%] w-[80%] border-mine-shaft-400 px-5 py-2 rounded-lg"><div className="text-mine-shaft-200 text-2xl text-center mb-2">SpotBugs</div>
            <div className="flex text-mine-shaft-400 text-lg flex-col">{spotBugs.map((data,index)=><div key={index}>{data}</div>)}</div>
        </div>}
        
        
    </div>
}