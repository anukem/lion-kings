"use client";

import { useState } from "react";

interface Props {
  clientId: string;
}
export function Editor(props: Props) {
  const { clientId } = props;
  const [text, setText] = useState<string>("");
  return (
    <div>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{ height: "300px", width: "400px" }}
      />
      <button
        style={{ display: "block" }}
        onClick={() => {
          localStorage.setItem(clientId, text);
          location.reload();
        }}
      >
        Add note
      </button>
    </div>
  );
}
