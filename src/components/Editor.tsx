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
    <div className="py-20 px-20">
      <input
        className="note-page-title outline-none "
        style={{ marginBottom: "40px" }}
        placeholder="Untitiled note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <MentionsInput
        className="outline-none"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          outline: "none",
          display: "block",
          height: "300px",
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
      <div
        className="button-new"
        onClick={() => {
          const currentValue = localStorage.getItem(clientId);

          if (title == "") {
            return;
          }
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
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10.65 6.00009C10.65 6.24849 10.4484 6.45009 10.2 6.45009H6.44999V10.2001C6.44999 10.4485 6.24839 10.6501 5.99999 10.6501C5.75159 10.6501 5.54999 10.4485 5.54999 10.2001V6.45009H1.8C1.5516 6.45009 1.35 6.24849 1.35 6.00009C1.35 5.75169 1.5516 5.55009 1.8 5.55009H5.54999V1.8001C5.54999 1.5517 5.75159 1.3501 5.99999 1.3501C6.24839 1.3501 6.44999 1.5517 6.44999 1.8001V5.55009H10.2C10.4484 5.55009 10.65 5.75169 10.65 6.00009Z"
            fill="white"
          />
        </svg>
        <div className="button-text cursor-pointer">Add note</div>
      </div>
    </div>
  );
}
