import { NavLink } from "react-router-dom";

function Navbar(){

    const nav = [
        {title:"Code Review",path:"/dashboard"},
        {title:"GitHub PRs",path:"/github-review"},
        {title:"Reports",path:"/reports"},
        {title:"Profile",path:"/profile"}
    ]

    return (
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 text-sm sm:text-base">
    {nav.map((data, index) => (
      <NavLink
        key={index}
        to={data.path}
        className={({ isActive }) =>
          isActive
            ? 'text-bright-sun-500 scale-105 duration-75 border-b-2 border-mine-shaft-200 font-semibold'
            : 'font-semibold hover:scale-105 duration-75 dark:text-mine-shaft-200 text-mine-shaft-500'
        }
      >
        {data.title}
      </NavLink>
    ))}
  </div>
    )
}

export default Navbar;