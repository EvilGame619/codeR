import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api.jsx";
export default function Review(){

    const location = useLocation();
    const [review, setReview] = useState(null);

    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const id = param.get("id");
        let uri = "/review/"+id;
        api.get(uri)
        .then((response)=> setReview(response.data))
        .catch((reject)=>console.log(reject));
    },[])
    
    return ((review != null)? (
            <div className="m-2 flex flex-col gap-5">
                
                <div>
                    <span className="font-bold text-xl">CheckStyle Errors: {review.checkStyle.length}</span>
                    {review.checkStyle.map((data, index) => <div key={index} className="ml-3">{data}</div>)}
                </div>
                <div>
                    <span className="font-bold text-xl">PMD Errors: {review.pmd.length}</span>
                    {review.pmd.map((data, index) => <div key={index} className="ml-3">{data}</div>)}
                </div>
                <div>
                    <span className="font-bold text-xl">SpotBugs Errors: {review.spotbugs.length}</span>
                    {review.spotbugs.map((data, index) => <div key={index} className="ml-3">{data}</div>)}
                </div>
            </div>
            ): (
        <div>

        </div>)
    );
}