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
        {isHidden ? (
          <h1
            style={{
              transform: "rotate(180deg)",
              textOrientation: "sideways",
              writingMode: "vertical-rl",
              display: "flex",
            }}
          >
            {note.title}
          </h1>
        ) : (
          <div>
            <div className="px-20 py-20">
              <div className="note-page-title">{note.title}</div>
              <p className="py-12 note-page-content" style={{ width: "600px" }}>
                {valueParser(note.content)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
