"use client";

import { valueParser } from "./Sidebar";

interface Props {
  noteId: string;
  isHidden: boolean;
  noteIds: string[];
}

export function NotePage(props: Props) {
  const { noteId, isHidden, noteIds } = props;
  const store = JSON.parse(localStorage.getItem("notes") || "{}");
  const note = store[noteId];

  const path = window.location.host
  const replaceIDs = () => {
    let newHref: string = `http://${path}?`
    const goodIDs: string[] = []
    var found = false
    noteIds.forEach((id) => {
      if (found) {
        return
      }
      if (id === props.noteId) {
        found = true
      }
      newHref = newHref.concat(`&noteId=${id}`)
      goodIDs.push(id)
    })
    window.location.href = newHref
  }

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
            onClick={replaceIDs}
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
