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
  {/* Header */}
  <div className="flex items-center justify-center gap-2 flex-wrap text-center">
    <IconCode className="h-16 w-16 md:h-20 md:w-20" stroke={2} />
    <div className="text-4xl md:text-5xl dark:text-mine-shaft-300 font-bold text-mine-shaft-500">
      code<span className="text-bright-sun-500">R</span>
    </div>
  </div>

  {/* Dark Mode Toggle */}
  <div className="absolute top-4 right-4">
    <DarkModeToggle />
  </div>

  {/* Login Card */}
  <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto dark:bg-mine-shaft-900 px-6 sm:px-10 md:px-16 py-4 bg-mine-shaft-200 rounded-xl my-6">
    <h1 className="font-semibold text-2xl sm:text-3xl text-mine-shaft-600 text-center p-4 dark:text-mine-shaft-400">Login</h1>

    <form onSubmit={handleSubmit((data) => afterSubmit(data))} className="flex flex-col pb-4">
      <input
        {...register("email")}
        type="text"
        className="px-3 py-2 text-center bg-mine-shaft-100 rounded-xl my-2 w-full"
        placeholder="Enter your email"
      />
      <input
        {...register("password")}
        type="password"
        className="px-3 py-2 text-center rounded-xl bg-mine-shaft-100 my-2 w-full"
        placeholder="Enter your password"
      />
      <input
        type="submit"
        className="bg-bright-sun-500 mt-3 px-4 py-3 text-lg rounded-lg hover:bg-bright-sun-400 hover:scale-110 duration-150 cursor-pointer w-1/2 sm:w-1/3 mx-auto"
      />
    </form>

    <div className="font-semibold text-2xl sm:text-3xl text-mine-shaft-600 text-center p-4 dark:text-mine-shaft-400">or</div>

    {/* Google Button */}
    <div
      onClick={() => (window.location.href = "http://localhost:8080/oauth2/authorization/google")}
      className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 mx-auto mb-3 py-2 px-1 hover:scale-105 duration-100 cursor-pointer dark:bg-mine-shaft-600 bg-mine-shaft-300 rounded-lg text-center"
    >
      <img className="h-10 mx-auto" src="/google.png" alt="" />
    </div>

    {/* Signup Link */}
    <div
      onClick={handleSignup}
      className="dark:text-mine-shaft-400 dark:hover:text-blue-300 hover:text-bright-sun-500 text-mine-shaft-600 mx-auto text-center hover:scale-105 duration-100 cursor-pointer"
    >
      New User? Signup
    </div>
  </div>
</div>
    
}