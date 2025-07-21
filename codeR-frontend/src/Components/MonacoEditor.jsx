import { useState } from "react"
import React from "react"
import { Editor } from "@monaco-editor/react"

export default function MonacoEditor({ defaultCode = "// Start coding here... (Remove this line before coding)", setCodeInParent }) {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("java");
  const [widthChanger, setWidth] = useState(null);

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
    { label: "TypeScript", value: "typescript" }
  ];

  const buttonClick = () => {
    setWidth(2);
    setCodeInParent(code);
  };

  return (
    <div className={`flex flex-col h-full items-center justify-start transition-all duration-500 ${widthChanger === null ? 'w-full' : 'w-full md:w-1/2'}`}>
      <div className="w-[90%] md:w-[80%] border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-2 py-2 bg-mine-shaft-100 dark:bg-mine-shaft-500 flex flex-wrap gap-2 items-center">
          <label className="text-sm font-medium">Select Language:</label>
          <select
            className="rounded-lg border-mine-shaft-400 border bg-mine-shaft-100 px-2 py-1 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((data) => (
              <option key={data.value} value={data.value}>
                {data.label}
              </option>
            ))}
          </select>
        </div>

        <Editor
          height="60vh"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(newCode) => setCode(newCode)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            scrollbar: { vertical: "hidden", horizontal: "hidden" }
          }}
        />
      </div>

      <button
        onClick={buttonClick}
        className="px-5 py-3 hover:scale-105 hover:bg-bright-sun-400 duration-100 mx-auto bg-bright-sun-500 mt-4 rounded-lg"
      >
        Submit Code
      </button>
    </div>
  );
}