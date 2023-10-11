"use client";

import { valueParser } from "./Sidebar";

interface Props {
  noteId: string;
}

export function NotePage(props: Props) {
  const { noteId } = props;
  const store = JSON.parse(localStorage.getItem("notes") || "{}");
  const note = store[noteId];

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{valueParser(note.content)}</p>
    </div>
  );
}
