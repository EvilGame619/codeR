import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import api from "../api.jsx";
import { useLocation } from "react-router-dom";
import SubTopicCard from "../Components/SubTopicCard.jsx";
import { IconCheck, IconPencil, IconUpload, IconX } from "@tabler/icons-react";
export default function Profile(){

    console.log("hello")

    const location = useLocation();
    const [userDetails, setUserDetails] = useState([]);
    const subTopic = ["Personal info","Contact","Social Links"];
    const [isEditing, setEditing] = useState(false); 
    const [updateDetails, setUpdateDetails] = useState(userDetails);
    useEffect(()=>{
            const param = new URLSearchParams(location.search);
            const token = param.get("token");
            if(token){
                localStorage.setItem("token",token);
            }
            
        },[location.search]);
    useEffect(()=>{
        getUser();
    },[])

    const getUser = ()=>{
        let uri = "/user/getUser"
        api.get(uri)
        .then((response)=>{setUserDetails(response.data)})
        .catch((reject)=>console.log(reject));
    }

    const onCheckClick= ()=>{
        const formData = new FormData();

        formData.append("firstName", updateDetails.firstName || null);
        formData.append("lastName", updateDetails.lastName || null);
        formData.append("location", updateDetails.location || null);
        formData.append("bio", updateDetails.bio || null);
        formData.append("phoneNumber", updateDetails.phoneNumber || null);
        formData.append("githubURL", updateDetails.githubURL || null);
        formData.append("likedInURL", updateDetails.likedInURL || null);
        console.log(formData.get("firstName"));
        console.log(formData.get("lastName"));
          if (updateDetails.profilePicture instanceof File) {
        formData.append("profilePicture", updateDetails.profilePicture);
        }
        console.log(formData.get("phoneNumber"))
        if(formData.get("phoneNumber")=="null"){
            formData.delete("phoneNumber");
        }
        
        let uri = "/user/edit";
        api.post(uri, formData)
        .then((response) => {
            setEditing(false);
            getUser(); 
        })
        .catch(reject => console.log(reject));
        
    }


    return <div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 min-h-screen">
        <Header/>
         <div className="flex justify-center my-6 text-3xl font-bold text-bright-sun-600">PROFILE SUMMARY</div>
            {(userDetails != null && userDetails.length !==0 )? 
            <div className="flex gap-3 duration-500 justify-center mx-[15%]">

                {/* left */}
                <div className="relative left p-3 flex flex-col justify-center gap-5 items-center self-center w-[30%]  border bg-mine-shaft-900 border-mine-shaft-500 rounded-lg">
                    <div className="relative flex gap-2 flex-col justify-center">
                        {isEditing && (
                             <div className="relative w-6 h-6"> {/* Adjust size as needed */}
    <IconUpload className="absolute top-0 right-0 z-10 text-gray-600 hover:cursor-pointer hover:scale-110 transition" />
    
    <input
      type="file"
      className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer z-20"
      onChange={handleFileChange} // Your upload logic here
    />
  </div>

                            )}
                        <img className="rounded-full bg-mine-shaft-300 h-20" src={userDetails.profilePicture} alt="" />
                        <span className="text-center font-bold text-bright-sun-500">{userDetails.username}</span>
                    </div>
                    <div className="w-full flex gap-3 flex-col ">
                        {subTopic.map((data,index)=><SubTopicCard key={index} text={data}/>)}
                    </div>
                </div>

                {/* right */}
                <div className="right relative w-[70%] border bg-mine-shaft-900 border-mine-shaft-500 rounded-lg">
                    <div className="absolute  right-[3%] top-[2%] cursor-pointer hover:scale-110" onClick={()=>{setEditing(!isEditing)}}>{isEditing? <div className="flex gap-5"><IconCheck onClick={onCheckClick}/><IconX onClick={()=>{setEditing(!isEditing)}}/></div>:<IconPencil/>}</div>
                    {/* personal info */}
                    <div className="personal-info px-5 py-2">
                        <div className="font-semibold text-2xl text-bright-sun-500">Personal Info</div>
                        <div className="flex gap-10 mt-5 w-full">
                            <div className="w-[40%]">
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">First Name  </div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Last Name  </div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Location  </div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Bio  </div>
                            </div>
                            <div className="w-[60%]">

                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                    isEditing? (<input type="text" placeholder={userDetails.firstName} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, firstName: e.target.value})}/>) :(
                                userDetails.firstName !== null? userDetails.firstName:"null")}</div>

                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.lastName} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, lastName: e.target.value})}/>) :(
                                userDetails.lastName !== null? userDetails.lastName:"null")}</div>

                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.location} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, location: e.target.value})}/>) :(
                                userDetails.location !== null? userDetails.location:"null")}</div>

                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.bio} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, bio: e.target.value})}/>) :(
                                userDetails.bio !== null? userDetails.bio: "null")}</div>
                            </div>
                        </div>
                    </div>

                    {/* contact */}
                    <div className="contact px-5 py-2">
                        <div className="font-semibold text-2xl text-bright-sun-500">Contact</div>
                        <div className="flex gap-10 mt-5 w-full">
                            <div className="w-[40%]">
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Email  </div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Phone Number  </div>
                            </div>
                            <div className="w-[60%]">
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">
                                    {userDetails.email !==null? userDetails.email:"null"}</div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.phoneNumber} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, phoneNumber: e.target.value})}/>) :(
                                userDetails.phoneNumber !==null? userDetails.phoneNumber:"null")}</div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="social px-5 py-2">
                        <div className="font-semibold text-2xl text-bright-sun-500">Social Links</div>
                        <div className="flex gap-10 mt-5 w-full">
                            <div className="w-[40%]">
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">Github  </div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-3/4">LinkedIn </div>
                            </div>
                            <div className="w-[60%]">
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.githubURL} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, githubURL: e.target.value})}/>) :(
                                userDetails.githubURL !==null? userDetails.githubURL:"null")}</div>
                                <div className="text-center px-3 py-2 text-mine-shaft-200 mb-3 rounded-lg bg-mine-shaft-600 w-full">{
                                isEditing? (<input type="text" placeholder={userDetails.likedInURL} className="bg-mine-shaft-300 rounded-lg placeholder:text-mine-shaft-900 text-mine-shaft-900 text-center" onChange={(e)=>setUpdateDetails({...updateDetails, likedInURL: e.target.value})}/>) :(
                                userDetails.likedInURL !==null? userDetails.likedInURL:"null")}</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>:(<div>No Records</div>)}
    </div>
}