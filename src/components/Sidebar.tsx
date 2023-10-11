"use client";

import { useState } from "react";

interface Props {
  selectedUserId: string;
}

export function Sidebar(props: Props) {
  const { selectedUserId } = props;
  const [lastChangedValue, setLastChangedValue] = useState("");
  const notesMap = JSON.parse(localStorage.getItem(selectedUserId) || "{}");
  return (
    <>
      Notes
      <div>
        {Object.entries(notesMap).map(([key, value]) => {
          return (
            <div key={key}>
              <span>{key}</span>
              <span style={{ marginLeft: "20px" }}>{value}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
