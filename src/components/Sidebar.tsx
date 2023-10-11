"use client";

import { useState } from "react";

interface Props {
  selectedUserId: string;
}

export function valueParser(value: string) {
  const rgx = /@\[[a-zA-Z0-9]+\]\(([a-zA-Z0-9]+)\)/g;
  const elements = value.split(rgx);
  const noteMap = JSON.parse(localStorage.getItem("notes") || "{}");
  return elements.map((itemId) => {
    if (noteMap[itemId]) {
      return (
        <button
          style={{ color: "lightblue" }}
          key={itemId}
          onClick={() =>
            (window.location.href =
              window.location.pathname + `?noteId=${itemId}`)
          }
        >
          {noteMap[itemId].title}
        </button>
      );
    }
    return itemId;
  });
}

export function Sidebar(props: Props) {
  const { selectedUserId } = props;
  const [lastChangedValue, setLastChangedValue] = useState("");
  const notesMap = JSON.parse(localStorage.getItem(selectedUserId) || "{}");

  Object.entries(notesMap).map(([key, value]) => {});

  return (
    <>
      All Notes for client {selectedUserId}
      <div>
        {Object.entries(notesMap).map(([key, value]) => {
          return (
            <div key={key}>
              <span>{key}</span>
              <span style={{ marginLeft: "20px" }}>{valueParser(value)}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
