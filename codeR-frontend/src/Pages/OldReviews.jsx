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
    

    return (
  <div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 min-h-screen">
    <Header />
    <div className="mt-3 mx-auto w-full px-4 sm:w-[90%] md:w-[80%] rounded-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="text-mine-shaft-600 dark:text-mine-shaft-200">
          <tr>
            <th className="py-3 border-3 border-mine-shaft-600 rounded-lg w-[10%] text-center whitespace-nowrap">Sr no.</th>
            <th className="py-3 border-3 border-mine-shaft-600 w-[30%] whitespace-nowrap">File Name</th>
            <th className="py-3 border-3 border-mine-shaft-600 w-[20%] text-center whitespace-nowrap">Code</th>
            <th className="py-3 border-3 border-mine-shaft-600 w-[20%] text-center whitespace-nowrap">Review</th>
            <th className="py-3 border-3 border-mine-shaft-600 w-[20%] text-center whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(reports == null || reports.length === 0) ? (
            <tr>
              <td colSpan={5} className="text-center py-6 dark:text-mine-shaft-300 text-mine-shaft-700">
                No Records to show
              </td>
            </tr>
          ) : (
            reports.map((data, index) => (
              <tr key={index} className="border-b-2 border-mine-shaft-600 text-mine-shaft-700 dark:text-mine-shaft-300">
                <td className="text-center py-6 border-2 border-mine-shaft-600 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-6 border-2 border-mine-shaft-600">{data.fileName}</td>
                <td className="py-6 border-2 border-mine-shaft-600 text-center">
                  <div className="flex justify-center cursor-pointer" onClick={() => handleCodeClick(data.id)}>
                    <IconClipboardText />
                  </div>
                </td>
                <td className="py-6 border-2 border-mine-shaft-600 text-center" onClick={() => handleReviewClick(data.review.id)}>
                  <div className="flex justify-center cursor-pointer">
                    <IconEyeShare />
                  </div>
                </td>
                <td className="py-6 border-2 border-mine-shaft-600 text-center">
                  <div className="flex gap-5 justify-center">
                    <IconPencil
                      onClick={() => { setSelectedId(data.id); setChangeName(true); }}
                      className="cursor-pointer"
                    />
                    {changeName && <ChangeNameBox onConfirm={handleRename} onCancel={() => setChangeName(false)} />}
                    <IconTrash
                      onClick={() => { setSelectedId(data.id); setDelReq(true); }}
                      className="cursor-pointer"
                    />
                    {deleteReq && (
                      <ConfirmDialogue
                        message="Are you sure you want to delete this item?"
                        onConfirm={() => { handleDeleteClick(selectedId); }}
                        onCancel={() => setDelReq(false)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    <div className="flex items-center justify-center mt-10 gap-5">
      <button
        className={`${page === totalPages - 1 ? 'hidden' : 'rounded-lg bg-bright-sun-300 px-5 py-2'}`}
        onClick={nextPage}
      >
        Next
      </button>
      <button
        className={`${page === 0 ? 'hidden' : 'rounded-lg bg-bright-sun-300 px-5 py-2'}`}
        onClick={prevPage}
      >
        Prev
      </button>
    </div>
  </div>
);

}