"use client";

import { Client } from "@/utils/copilotApiUtils";
import { Editor } from "./Editor";
import { useState } from "react";

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
                  style={{ width: "100%" }}
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
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => {
        setShowAddPage(true);
      }}
      onMouseLeave={() => {
        setShowAddPage(false);
      }}
      style={{
        fontWeight: isSelected ? "bold" : "",
      }}
      className="flex justify-between flex-1 mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-migration-dark-font text-[14px] tracking-[0] leading-[22px]"
    >
      <div className="flex-none">{name}</div>
      {showAddPage && <AddPageButton />}
    </div>
  );
}

function AddPageButton() {
  return (
    <svg
      className="flex-none"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clip-path="url(#clip0_40415_115517)">
        <path
          d="M13.5407 7.29688V14.0415C13.5407 14.4823 13.3656 14.9052 13.0539 15.2169C12.7421 15.5287 12.3193 15.7038 11.8784 15.7038H4.12083C3.67995 15.7038 3.25713 15.5287 2.94538 15.2169C2.63363 14.9052 2.4585 14.4823 2.4585 14.0415V2.95921C2.4585 2.51833 2.63363 2.09551 2.94538 1.78376C3.25713 1.47201 3.67995 1.29688 4.12083 1.29688H7.54075C7.83457 1.29692 8.11634 1.41364 8.32412 1.62138L13.2162 6.5135C13.424 6.72128 13.5407 7.00306 13.5407 7.29688Z"
          stroke="#60606A"
          stroke-linejoin="round"
        />
        <path
          d="M8 1.57324V5.72909C8 6.02301 8.11676 6.30489 8.32459 6.51272C8.53242 6.72055 8.81431 6.83731 9.10822 6.83731H13.2641"
          stroke="#60606A"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.1603 10.9002H5.84033M8.00033 8.74023V13.0602V8.74023Z"
          stroke="#60606A"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_40415_115517">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
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
