import { IconCode } from "@tabler/icons-react";
import DarkModeToggle from "../Components/DarkMode";
import CardLandingPage from "../Components/CardLandingPage";
import { useNavigate } from "react-router-dom";

export default function LandingPage(){

    const navigate = useNavigate();
    const onClickGetStarted = ()=>{
        navigate("/auth/login");
    }

    const cardsData = [
        {img:"/code.png",title:"Ship high quality code",description:"Ensure that you ship high quality and bug-free code every time."},
        {img:"/stopwatch.png",title:"Save time",description:"Catch the issues in your code early on by bringing on another pair of eyes. Don't wait until they cause problems in production."},
        {img:"/stars.png",title:"Reviewed by experts",description:"Our mentors can perform security audits, review your overall architecture, or check your coding style."}
    ]

    return <div className="bg-mine-shaft-100 pt-3 dark:bg-mine-shaft-800 duration-300 min-h-screen flex px-10 flex-col relative">
            <div className="flex items-center justify-center gap-2 ">
                <IconCode className="h-20 w-20" stroke={2}/>
                <div className="text-5xl dark:text-mine-shaft-300 font-bold text-mine-shaft-500">code<span className="text-bright-sun-500">R</span></div>
            </div>
            <div className="absolute top-12 right-7"><DarkModeToggle/></div>
            <div className="flex items-center mt-3">
                <div className="flex h-72 border-mine-shaft-300 rounded-lg ml-4 px-14 items-center border-2  w-[45%] gap-2 justify-center flex-col">
                    <div className="font-semibold text-4xl text-mine-shaft-600 dark:text-mine-shaft-400">What is code review?</div>
                    <div className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Code review happens when another developer goes through your or your team's code line-by-line and provides constructive, helpful feedback. Code review saves time and effort by ensuring code quality up-front, rather than waiting until issues are discovered in production. It’s an essential part of the day-to-day lives of many professional software developers and data scientists.</div>
                </div>
                <div className="w-[55%] flex items-start justify-center"><img className="h-1/2 w-1/2" src="/coderFront2.png" alt="" /></div>
            </div>
            <div className="flex justify-center mt-5"><div onClick={onClickGetStarted} className="px-9 py-4 hover:scale-110 duration-150 cursor-pointer hover:bg-bright-sun-400 bg-bright-sun-500 rounded-full">Get Started</div></div>

            <div className="flex w-full justify-around mt-5">{cardsData.map((data,index)=> <CardLandingPage key={index} info={data}/>)}</div>
    </div>
}