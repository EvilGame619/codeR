import { useForm } from "react-hook-form";
import { IconCode } from "@tabler/icons-react";
import DarkModeToggle from "../Components/DarkMode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login(){

    const {register,handleSubmit} = useForm();

    const navi = useNavigate();

    const afterSubmit = (data) => {
        let uri = "http://localhost:8080/auth/login";
        axios.post(uri, data,{ withCredentials: true })
        .then((response)=>{
            const accessToken = response.data.accessToken;
            console.log(response.data);
            localStorage.setItem('token',accessToken);
            navi("/dashboard");})
        .catch(response=> console.log(response));
    }

   const handleSignup = ()=>{
    navi("/auth/signup");
   }

    return <div className="bg-mine-shaft-100 pt-3 dark:bg-mine-shaft-800 duration-300 min-h-screen h-full relative">
                <div className="flex items-center justify-center gap-2 ">
                    <IconCode className="h-20 w-20" stroke={2}/>
                    <div className="text-5xl dark:text-mine-shaft-300 font-bold text-mine-shaft-500">code<span className="text-bright-sun-500">R</span></div>
                </div>
                <div className="absolute top-12 right-7"><DarkModeToggle/></div>

                <div className="mx-[30%] dark:bg-mine-shaft-900 px-16 py-2 bg-mine-shaft-200 rounded-xl my-5">
                <h1 className="font-semibold text-3xl text-mine-shaft-600 text-center p-4 dark:text-mine-shaft-400">Login</h1>
                    <form onSubmit={handleSubmit((data)=>afterSubmit(data))} className="flex flex-col pb-4" action="">
                        <input {...register("email")} type="text" className="px-3 py-2 mx-[20%] text-center bg-mine-shaft-100 rounded-xl my-2" placeholder="Enter your email"/>
                        <input {...register("password")} type="password" className="px-3 py-2 mx-[20%] text-center rounded-xl bg-mine-shaft-100 my-2" placeholder="Enter your password"/>
                        <input type="submit" className="bg-bright-sun-500 mt-3 px-4 py-3 text-lg rounded-lg hover:bg-bright-sun-400 hover:scale-110 duration-150 cursor-pointer w-[20%] mx-auto" />
                    </form>
                    <div className="font-semibold text-3xl text-mine-shaft-600 text-center p-4 dark:text-mine-shaft-400">or</div>
                    <div onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"} className="mx-[30%] mb-3 py-2 px-1 hover:scale-105 duration-100 cursor-pointer dark:bg-mine-shaft-600 bg-mine-shaft-300 rounded-lg text-center">
                        <img className="h-12 mx-auto" src="/google.png" alt="" />
                    </div>

                    <div onClick={handleSignup} className=" dark:text-mine-shaft-400 dark:hover:text-blue-300 hover:text-bright-sun-500 text-mine-shaft-600 mx-auto text-center hover:scale-105 duration-100 cursor-pointer">New User? Signup</div>
                    
                </div>
    </div>
    
}