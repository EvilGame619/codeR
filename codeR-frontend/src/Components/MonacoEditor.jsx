import { useState } from "react"
import React from "react"
import { Editor } from "@monaco-editor/react"

export default function MonacoEditor({defaultCode = "// Start coding here... (Remove this line before coding)", setCodeInParent }){
    const [code, setCode] = useState(defaultCode);
    const [language, setLanguage] = useState("java");
    const [widthChanger, setWidth] = useState(null);
    const languages = [
        {label:"JavaScript", value:"javascript"},
        {label:"Java", value:"java"},
        {label:"Python", value:"python"},
        {label:"C++", value:"cpp"},
        {label:"TypeScript", value:"typescript"}
    ]
    const buttonClick = () =>{
        setWidth(2);
        setCodeInParent(code);
    }
    return <div className={`flex h-[100%] items-center justify-center flex-col ${widthChanger==null? 'w-[100%]':'w-[50%]'} duration-500`}>
                <div className=" w-[80%] border border-gray-700 rounded-lg overflow-hidden">
                    <div className="px-2 py-1 bg-mine-shaft-100 dark:bg-mine-shaft-500">
                        <label>Select Language: </label>
                        <select className="rounded-lg border-mine-shaft-400 border bg-mine-shaft-100 px-1" value={language} onChange={(e)=>setLanguage(e.target.value)}>
                            {languages.map((data)=> <option key={data.value} value={data.value}>{data.label}</option>)}
                        </select>
                    </div>
                    <Editor height="100%" theme="vs-dark" language={language} value={code} onChange={(newCode) => setCode(newCode)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false }, // Hide minimap
                            wordWrap: "on",
                            automaticLayout: true, // Auto resize
                            scrollbar: { vertical: "hidden", horizontal: "hidden" },
                        }}/>
                </div>
                <button onClick={buttonClick} className="px-5 py-3 hover:scale-105 hover:bg-bright-sun-400 duration-100 mx-auto bg-bright-sun-500 mt-5 rounded-lg">Submit Code</button>
    </div>
}