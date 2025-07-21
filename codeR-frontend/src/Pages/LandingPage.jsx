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

    return <div className="bg-mine-shaft-100 pt-3 dark:bg-mine-shaft-800 duration-300 min-h-screen flex px-4 md:px-10 flex-col relative">
  {/* Header */}
  <div className="flex items-center justify-center gap-2 flex-wrap text-center">
    <IconCode className="h-16 w-16 md:h-20 md:w-20" stroke={2} />
    <div className="text-4xl md:text-5xl dark:text-mine-shaft-300 font-bold text-mine-shaft-500">
      code<span className="text-bright-sun-500">R</span>
    </div>
  </div>

  {/* Dark mode toggle */}
  <div className="absolute top-4 right-4">
    <DarkModeToggle />
  </div>

  {/* Main section */}
  <div className="flex flex-col lg:flex-row items-center mt-8 gap-6">
    <div className="flex flex-col h-auto border-mine-shaft-300 rounded-lg border-2 w-full lg:w-[45%] px-6 md:px-10 py-6 gap-3">
      <div className="font-semibold text-2xl md:text-3xl lg:text-4xl text-mine-shaft-600 dark:text-mine-shaft-400 text-center lg:text-left">
        What is code review?
      </div>
      <div className="text-base md:text-lg text-mine-shaft-600 dark:text-mine-shaft-200 text-center lg:text-left">
        Code review happens when another developer goes through your or your team's code line-by-line and provides constructive, helpful feedback. Code review saves time and effort by ensuring code quality up-front, rather than waiting until issues are discovered in production. It’s an essential part of the day-to-day lives of many professional software developers and data scientists.
      </div>
    </div>

    <div className="w-full lg:w-[55%] flex items-center justify-center">
      <img className="w-3/4 md:w-1/2" src="/coderFront2.png" alt="" />
    </div>
  </div>

  {/* Get started button */}
  <div className="flex justify-center mt-8">
    <div
      onClick={onClickGetStarted}
      className="px-8 py-3 md:px-9 md:py-4 hover:scale-110 duration-150 cursor-pointer hover:bg-bright-sun-400 bg-bright-sun-500 rounded-full text-sm md:text-base"
    >
      Get Started
    </div>
  </div>

  {/* Cards section */}
  <div className="flex flex-wrap justify-evenly gap-6 mt-6 px-4">
    {cardsData.map((data, index) => (
      <CardLandingPage key={index} info={data} />
    ))}
  </div>
</div>

}