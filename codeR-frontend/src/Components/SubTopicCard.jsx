import React from "react";

export default function SubTopicCard({text}){
    return <div className=" bg-mine-shaft-600 rounded-xl hover:scale-105 cursor-pointer">
        <div className="px-4 py-2 text-center text-mine-shaft-200">{text}</div>
    </div>
}