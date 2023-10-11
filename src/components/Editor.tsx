"use client";

import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

interface Props {
  clientId: string;
}

// generate a unique id of 10 characters for each note
// using only numbers and letters
function generateId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getNotesData() {
  const store = JSON.parse(localStorage.getItem("notes") || "{}");
  const notes = Object.keys(store).map((key) => {
    return {
      id: key,
      display: store[key].title,
    };
  });
  return notes;
}

export function Editor(props: Props) {
  const { clientId } = props;
  const [text, setText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  return (
    <div>
      Title
      <input
        style={{ marginLeft: "10px", marginBottom: "40px" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <div>Content</div>
      <MentionsInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          display: "block",
          height: "300px",
          width: "400px",
          outline: "none",
          background: "white",
        }}
      >
        <Mention
          style={{ color: "lightblue" }}
          trigger="@"
          data={getNotesData()}
          renderSuggestion={(suggestion) => (
            <div style={{ border: "1px solid black" }}>
              {suggestion.display}
            </div>
          )}
        />
      </MentionsInput>
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

          const noteMap = JSON.parse(localStorage.getItem("notes") || "{}");

          const uniqueId = generateId();

          noteMap[uniqueId] = {
            title,
            associatedClient: clientId,
            content: text,
          };
          localStorage.setItem("notes", JSON.stringify(noteMap));
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
