import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import api from "../api.jsx";
import { useLocation } from "react-router-dom";
import { IconClipboardText, IconEyeShare, IconPencil, IconTrash } from "@tabler/icons-react";
import ConfirmDialogue from "../Components/ConfirmDialogue";
import ChangeNameBox from "../Components/ChangeNameBox";

export default function OldReviews(){
    const [reports, setReports] = useState([]);
    const location = useLocation();
    const [page,setPage] = useState(0);
    const [totalPages, setTotalpages] = useState(1);
    const [deleteReq, setDelReq] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [changeName, setChangeName] = useState(false);
    const uri = "/code/getSubmittedCodes?page="+page;
    

    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const token = param.get("token");
        if(token){
            localStorage.setItem("token",token);
        }
        
    },[location.search]);

    
    useEffect(()=>{
        loadReviews();
    },[page]);

    const loadReviews = () => {
        api.get(uri)
        .then((response)=>{console.log(response);
            setReports(response.data.content);
            setTotalpages(response.data.totalPages)})
        .catch((reject)=>console.log(reject));
    }

    const nextPage = ()=>{
        
        setPage((page)=>(page+1)%reports.length);
    }
    const prevPage = () =>{
        
        setPage((page)=>(page - 1 + reports.length)%reports.length);
    }

    const handleCodeClick = (data) =>{
        let uri = "http://localhost:5173/report/code?id="+data;
        window.open(uri,"_blank","width=800,height=600");
    }

    const handleReviewClick = (data) =>{

        let uri = "http://localhost:5173/report/review?id="+data;
        window.open(uri, "_blank","width=800,height=600");
    }


    const handleDeleteClick = (data) =>{
        let uri = "/review/"+data;
        
        api.delete(uri)
            .then(()=>{
                loadReviews();            
            })
            .catch((response)=> console.log(response));
        setDelReq(false);
        
    }

    const handleRename = (data) =>{
        
        let uri = "/code/changeName/"+selectedId;
        console.log(uri);
        api.post(uri,{
             name: data.name
        })
        .then(()=>{
            loadReviews();
        })
        .catch(response => console.log(response));
        setChangeName(false);
    }
    

    return <div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 h-[100vh]">
        <Header/>
        <div className="flex mt-3 rounded-md  mx-auto w-[80%] justify-center">
            <div className="w-full">
                <table className="w-full">
                    <thead className=" text-mine-shaft-200">
                        <tr>
                            <th className="py-3 border-mine-shaft-600 border-[3px] rounded-lg w-[10%]">Sr no.</th>
                            <th className="py-3 border-mine-shaft-600 border-[3px] w-[30%]">File Name</th>
                            <th className="py-3 border-mine-shaft-600 border-[3px] w-[20%]">Code</th>
                            <th className="py-3 border-mine-shaft-600 border-[3px] w-[20%]">Review</th>
                            <th className="py-3 border-mine-shaft-600 border-[3px] w-[20%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(reports==null || reports.length===0)? (<tr><td>No Records to show</td></tr>): 
                        (reports.map((data, index)=>
                        <tr key={index} className="border-mine-shaft-600 text-mine-shaft-300 border-b-2 ">

                            <td className="text-center py-6 border-2 border-mine-shaft-600">{index+1}</td>

                            <td className="px-8 py-6 border-2 border-mine-shaft-600">{data.fileName}</td>

                            <td className="py-6 border-2 border-mine-shaft-600">
                                <div className="flex hover:cursor-pointer justify-center" onClick={()=> handleCodeClick(data.id)}>
                                    <IconClipboardText/>
                                </div>
                            </td>

                            <td className="py-6 border-2 border-mine-shaft-600" onClick={()=> handleReviewClick(data.review.id)}>
                                <div className="flex hover:cursor-pointer justify-center">
                                    <IconEyeShare/>
                                </div>
                            </td>

                            <td className="py-6 border-2 border-mine-shaft-600">
                                <div className="flex gap-5 justify-center">
                                    <IconPencil onClick={()=>{setSelectedId(data.id); setChangeName(true)}} className=" hover:cursor-pointer"/>
                                    {changeName && <ChangeNameBox onConfirm={handleRename} onCancel={()=>setChangeName(false)} /> }
                                    <IconTrash onClick={()=>{
                                        setSelectedId(data.id);
                                        setDelReq(true);
                                        }} 
                                        className="hover:cursor-pointer"/>
                                    {deleteReq && <ConfirmDialogue 
                                    message="Are you sure you want to delete this item?" 
                                    onConfirm = {()=>{handleDeleteClick(selectedId)}} 
                                    onCancel={()=>setDelReq(false)}
                                    />}
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex items-center justify-center mt-10 gap-5">
            <button className={`${page===totalPages-1? 'hidden': 'rounded-lg bg-bright-sun-300 px-5 py-2'}`} onClick={nextPage}>Next</button>
            <button className={`${page===0? 'hidden': 'rounded-lg bg-bright-sun-300 px-5 py-2'}`} onClick={prevPage}>Prev</button>
        </div>
    </div>
}