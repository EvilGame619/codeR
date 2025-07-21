import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import api from "../api.jsx";
import { useLocation } from "react-router-dom";
import SubTopicCard from "../Components/SubTopicCard.jsx";
import { IconCheck, IconPencil, IconUpload, IconX } from "@tabler/icons-react";
export default function Profile(){


    const location = useLocation();
    const [userDetails, setUserDetails] = useState([]);
    const subTopic = ["Personal info","Contact","Social Links"];
    const [isEditing, setEditing] = useState(false); 
    const [updateDetails, setUpdateDetails] = useState(userDetails);
    const [username,setUsername] = useState(null);
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

    // const checkUsernameAvailablity = (s) =>{
    //     if(s.length()===4){
            
    //     }
    // }

    const handleImageClick = (e)=>{
            const file = e.target.files[0];
            if(file){
                setUpdateDetails({...updateDetails, profilePicture:file});
            }
    }


    return (
        <div>
    <Header />
  <div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 min-h-screen px-4 py-6">
    <h1 className="text-center text-3xl font-bold text-mine-shaft-600 dark:text-bright-sun-600 mb-6">
      PROFILE SUMMARY
    </h1>

    {userDetails && userDetails.length !== 0 ? (
      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-[1200px] mx-auto">

        {/* Left panel */}
        <div className="flex flex-col items-center w-full md:w-1/3 p-4 border border-mine-shaft-500 rounded-lg bg-mine-shaft-300 dark:bg-mine-shaft-900 relative">
          {isEditing && (
            <label
              htmlFor="inputFile"
              className="absolute top-3 right-3 cursor-pointer"
              title="Upload Profile Picture"
            >
              <IconUpload />
            </label>
          )}
          <input
            type="file"
            id="inputFile"
            className="hidden"
            onChange={handleImageClick}
          />
          <img
            src={userDetails.profilePicture}
            alt="Profile"
            className="rounded-full h-20 w-20 bg-mine-shaft-300"
          />
          <span className="mt-3 text-center font-bold text-bright-sun-700 dark:text-bright-sun-500 max-w-[120px] w-full">
            {isEditing ? (
              <input
                type="text"
                maxLength={20}
                defaultValue={userDetails.username || ""}
                className="bg-mine-shaft-400 dark:bg-mine-shaft-300 rounded-lg placeholder:text-bright-sun-700 dark:placeholder:text-mine-shaft-900 text-bright-sun-700 dark:text-mine-shaft-900 text-center w-full px-2 py-1"
                onChange={(e) =>
                  setUpdateDetails({ ...updateDetails, username: e.target.value })
                }
              />
            ) : (
              userDetails.username || "null"
            )}
          </span>

          <div className="mt-6 w-full flex flex-col gap-3">
            {subTopic.map((data, index) => (
              <SubTopicCard key={index} text={data} />
            ))}
          </div>
        </div>

        {/* Right panel */}
<div className="w-full md:w-2/3 border border-mine-shaft-500 rounded-lg bg-mine-shaft-300 dark:bg-mine-shaft-900 p-6 relative">

  {/* Edit toggle icons */}
  <div
    className="absolute right-4 top-4 cursor-pointer hover:scale-110 flex gap-3 z-10"
    onClick={() => setEditing(!isEditing)}
    title={isEditing ? "Cancel Editing" : "Edit Profile"}
  >
    {isEditing ? (
      <>
        <IconCheck onClick={onCheckClick} />
        <IconX onClick={() => setEditing(false)} />
      </>
    ) : (
      <IconPencil />
    )}
  </div>

  {/* Personal Info */}
  <section className="mb-8">
    <h2 className="font-semibold text-2xl text-mine-shaft-500 dark:text-bright-sun-500 mb-5">
      Personal Info
    </h2>
    <div className="flex flex-col gap-4">
      {[
        { label: "First Name", field: "firstName" },
        { label: "Last Name", field: "lastName" },
        { label: "Location", field: "location" },
        { label: "Bio", field: "bio" },
      ].map(({ label, field }) => (
        <div
          key={field}
          className="flex justify-between items-center bg-mine-shaft-400 dark:bg-mine-shaft-600 rounded-lg px-3 py-2"
        >
          <div className="text-mine-shaft-200 dark:text-mine-shaft-400 font-medium">
            {label}
          </div>

          <div className="text-mine-shaft-900 dark:text-mine-shaft-200 w-[60%] text-right">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userDetails[field] || ""}
                className="bg-transparent w-full text-right outline-none dark:text-mine-shaft-200"
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    [field]: e.target.value,
                  })
                }
              />
            ) : (
              userDetails[field] || "null"
            )}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Contact */}
  <section className="mb-8">
    <h2 className="font-semibold text-2xl text-mine-shaft-500 dark:text-bright-sun-500 mb-5">
      Contact
    </h2>
    <div className="flex flex-col gap-4">
      {[
        { label: "Email", value: userDetails.email || "null", editable: false, field: null },
        { label: "Phone Number", value: userDetails.phoneNumber || "null", editable: true, field: "phoneNumber" },
      ].map(({ label, value, editable, field }) => (
        <div
          key={label}
          className="flex justify-between items-center bg-mine-shaft-400 dark:bg-mine-shaft-600 rounded-lg px-3 py-2"
        >
          <div className="text-mine-shaft-200 dark:text-mine-shaft-400 font-medium">
            {label}
          </div>
          <div className="text-mine-shaft-900 dark:text-mine-shaft-200 w-[60%] text-right">
            {editable && isEditing ? (
              <input
                type="text"
                defaultValue={value}
                className="bg-transparent w-full text-right outline-none dark:text-mine-shaft-200"
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    [field]: e.target.value,
                  })
                }
              />
            ) : (
              value
            )}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Social Links */}
  <section>
    <h2 className="font-semibold text-2xl text-mine-shaft-500 dark:text-bright-sun-500 mb-5">
      Social Links
    </h2>
    <div className="flex flex-col gap-4">
      {[
        { label: "Github", field: "githubURL" },
        { label: "LinkedIn", field: "likedInURL" },
      ].map(({ label, field }) => (
        <div
          key={field}
          className="flex justify-between items-center bg-mine-shaft-400 dark:bg-mine-shaft-600 rounded-lg px-3 py-2"
        >
          <div className="text-mine-shaft-200 dark:text-mine-shaft-400 font-medium">
            {label}
          </div>
          <div className="text-mine-shaft-900 dark:text-mine-shaft-200 w-[60%] text-right">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userDetails[field] || ""}
                className="bg-transparent w-full text-right outline-none dark:text-mine-shaft-200"
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    [field]: e.target.value,
                  })
                }
              />
            ) : (
              userDetails[field] || "null"
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
  </div>

    ) : (
      <div className="text-center text-mine-shaft-700 dark:text-mine-shaft-300 mt-10">
        No Records
      </div>
    )}
  </div>
  </div>
);


}