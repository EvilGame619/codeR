import { NavLink } from "react-router-dom";

function Navbar(){

    const nav = [
        {title:"Code Review",path:"/dashboard"},
        {title:"GitHub PRs",path:"/github-review"},
        {title:"Reports",path:"/reports"},
        {title:"Profile",path:"/profile"}
    ]

    return (
        <div className="flex gap-8">
        {nav.map((data, index)=><NavLink key={index} className={(e)=>e.isActive? 'text-bright-sun-500 scale-105 duration-75 border-b-mine-shaft-200 font-semibold':' font-semibold hover:scale-105 duration-75 dark:text-mine-shaft-200 text-mine-shaft-500'} to={data.path}>{data.title}</NavLink>)}
        </div>
    )
}

export default Navbar;