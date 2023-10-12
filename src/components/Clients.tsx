"use client";

import { Client } from "@/utils/copilotApiUtils";
import { Editor } from "./Editor";

interface Props {
  clients: Client[];
  selectedUserId?: string;
}

export function Clients(props: Props) {
  const { clients, selectedUserId } = props;

  return (
    <div>
      {clients.map((client: Client) => {
        const isSelected =
          Boolean(selectedUserId) && selectedUserId === client.id;
        return (
          <div key={client.id}>
          <button
            style={{
              display: "block",
              fontWeight: isSelected ? "bold" : "",
              fontFamily: "Inter",
              padding: '0.5em',
            }}
            key={client.familyName}
            onClick={() => {
              window.location.href =
                window.location.pathname + `?clientId=${client.id}`;
            }}
          >
            {`${client.givenName} ${client.familyName}`}
          </button>
          </div>
        );
      })}
    </div>
  );
}
