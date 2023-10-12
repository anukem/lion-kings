"use client";

import { Client } from "@/utils/copilotApiUtils";
import { Editor } from "./Editor";

interface Props {
  clients: Client[];
  selectedUserId?: string;
}

export function Clients(props: Props) {
  const { clients, selectedUserId } = props;

  const notes = JSON.parse(localStorage.getItem("notes") || "{}");

  return (
    <>
      <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
        <div className="flex flex-col w-[280px] items-start gap-[12px] pl-0 pr-[20px] py-0 relative flex-[0_0_auto]">
          {clients.map((client: Client) => {
            const isSelected =
              Boolean(selectedUserId) && selectedUserId === client.id;

            const clientNotes = Object.entries(notes).filter(([key, value]) => {
              return value.associatedClient === client.id;
            });
            return (
              <>
                <button
                  key={client.familyName}
                  onClick={() => {
                    window.location.href =
                      window.location.pathname + `?clientId=${client.id}`;
                  }}
                >
                  <ClientTitle
                    isSelected={isSelected}
                    name={`${client.givenName} ${client.familyName}`}
                  />
                </button>
                <div className="flex flex-col items-start gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                  {/** Client notes */}
                  {clientNotes.map(([noteId, note]) => {
                    return (
                      <SubTitle
                        itemId={noteId}
                        key={note.title}
                        title={note.title}
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ClientTitle(props: { name: string; isSelected: boolean }) {
  const { name, isSelected } = props;
  return (
    <div
      style={{
        display: "block",
        fontWeight: isSelected ? "bold" : "",
      }}
      className="relative flex-1 mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-migration-dark-font text-[14px] tracking-[0] leading-[22px]"
    >
      {name}
    </div>
  );
}

function SubTitle(props: { title: string; itemId: string }) {
  const { itemId } = props;
  return (
    <div
      onClick={() => {
        window.location.href = window.location.pathname + `?noteId=${itemId}`;
      }}
      className="flex items-center gap-[10px] pl-[16px] pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]"
    >
      <div className=" relative flex-1 mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-migration-gray-font text-[14px] tracking-[0] leading-[22px]">
        <div className="cursor-pointer">{props.title}</div>
      </div>
    </div>
  );
}
