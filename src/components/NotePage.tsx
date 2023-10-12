"use client";

import { valueParser } from "./Sidebar";

interface Props {
  noteId: string;
  isHidden: boolean;
}

export function NotePage(props: Props) {
  const { noteId, isHidden } = props;
  const store = JSON.parse(localStorage.getItem("notes") || "{}");
  const note = store[noteId];

  return (
    <div>
      <div>
        {isHidden ? 
        <h1 style={{
          transform: "rotate(180deg)",
          textOrientation: "sideways",
          writingMode: "vertical-rl",
          display: "flex",
        }}>{note.title}</h1>
         : 
         <div>
        <h1>{note.title}</h1>
        <p style={{width: "600px"}}>{valueParser(note.content)}</p>
        </div>

      }
      </div>
    
    </div>
  );
}
