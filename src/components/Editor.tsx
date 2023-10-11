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
          const currentValue = localStorage.getItem(clientId);

          // Create a new Date object to get the current date and time
          const currentDate = new Date();

          // Get the current time in various formats
          const currentHour = currentDate.getHours(); // Get the current hour (0-23)
          const currentMinute = currentDate.getMinutes(); // Get the current minute (0-59)
          const currentSecond = currentDate.getSeconds(); // Get the current second (0-59)

          const timeStamp = `${currentHour}:${currentMinute}:${currentSecond}`;

          if (currentValue === undefined || currentValue === null) {
            localStorage.setItem(
              clientId,
              JSON.stringify({
                [timeStamp]: text,
              })
            );
            location.reload();
            return;
          }
          const currentMap = JSON.parse(currentValue);
          currentMap[timeStamp] = text;
          localStorage.setItem(clientId, JSON.stringify(currentMap));
          location.reload();
        }}
      >
        Add note
      </button>
    </div>
  );
}
