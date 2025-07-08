import React from "react";
import { useForm } from "react-hook-form";

export default function ChangeNameBox({onConfirm, onCancel}){

    const {register, handleSubmit} = useForm();
    return <div className="fixed inset-0 z-40">
        <div className="absolute shadow-[0_0_12px_rgba(255,255,255,0.3)] h-44 w-72 px-5 py-4 rounded-lg bg-mine-shaft-300 top-[45%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <form onSubmit={handleSubmit(onConfirm)}>
                <div className="text-mine-shaft-600 mb-2 text-center font-semibold">New Name</div>
                <input {...register('name', {required:"New name is required", minLength:{value:3, message:"Name should be atleast 3 characters long"}})}
                placeholder="Enter Name"
                 className="w-full px-1 rounded-md h-9" type="text" />
                 <div className="flex justify-evenly mt-3 ">
                    <button className="bg-mine-shaft-400 px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-bright-sun-500 hover:text-mine-shaft-600">Submit</button>
                    <button onClick={onCancel} className="bg-mine-shaft-400 px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-bright-sun-500 hover:text-mine-shaft-600">Cancel</button>
                 </div>
                 
                
            </form>
            </div>
    </div>
}
// {(data)=>handleSubmit(onConfirm(data.target[0].value))}