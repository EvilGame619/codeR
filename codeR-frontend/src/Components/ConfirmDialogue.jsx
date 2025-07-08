import React from "react";

export default function ConfirmDialogue({message, onConfirm, onCancel}){
    return <div className="fixed inset-0 z-40"> 
        <div className="absolute top-[45%] left-[50%] shadow-[0_0_12px_rgba(255,255,255,0.3)] -translate-x-[50%] -translate-y-[50%] p-10 rounded-xl  bg-mine-shaft-300/80">
            <div className="mb-5 font-semibold text-mine-shaft-600">{message}</div>
            <div className="flex  justify-evenly">
                <div className="bg-mine-shaft-400 px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-bright-sun-500 hover:text-mine-shaft-600" onClick={onConfirm}>Yes</div>
                <div className="bg-mine-shaft-400 px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-bright-sun-500 hover:text-mine-shaft-600" onClick={onCancel}>No</div>
            </div>
        </div>
    </div>
}