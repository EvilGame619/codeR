
import React from "react";
import Header from "../Header/Header";

export default function NotFound(){
    return (
        <div className="dark:bg-mine-shaft-950 bg-mine-shaft-200 min-h-screen flex flex-col">
  <Header />
  <div className="flex-grow flex items-center justify-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl text-mine-shaft-700 dark:text-bright-sun-500 text-center">
      404 Page not found
    </h1>
  </div>
</div>
    )
}