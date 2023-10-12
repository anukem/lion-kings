import { Clients } from "@/components/Clients";
import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { NotePage } from "@/components/NotePage";
import { Notes } from "@/components/Notes";
import { Sidebar } from "@/components/Sidebar";
import { Client, Company, CopilotAPI } from "@/utils/copilotApiUtils";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type SearchParams = { [key: string]: string | string[] | undefined };

async function getContent(searchParams: SearchParams) {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error("Missing COPILOT_API_KEY");
  }

  const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY);
  const result: { client?: Client; company?: Company } = {};

  if (searchParams.clientId && typeof searchParams.clientId === "string") {
    result.client = await copilotAPI.getClient(searchParams.clientId);
  }

  if (searchParams.companyId && typeof searchParams.companyId === "string") {
    result.company = await copilotAPI.getCompany(searchParams.companyId);
  }

  return result;
}

async function getAllClients(): Promise<{ data: Client[] }> {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error("Missing COPILOT_API_KEY");
  }
  const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY);

  return copilotAPI.getAllClients();
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data: clients } = await getAllClients();
  const selectedUserId = searchParams.clientId;

  if (Array.isArray(searchParams.noteId)) {
    return <Notes noteIds={searchParams.noteId} />;
  }

  const selectedNote = searchParams.noteId;

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div
          style={{
            display: "flex",
            borderBottomWidth: "1px",
            flexDirection: "column",
          }}
        >
          <Header
            style={{
              fontSize: "13px",
              fontStyle: "normal",
              fontFamily: "revert",
              fontWeight: "500",
              background: "var(--new-common-white, #FFF)",
              paddingLeft: "5px",
            }}
            headerType="main"
            title="Notes"
          />
          <Frame
            clients={clients}
            selectedNote={selectedNote}
            selectedUserId={selectedUserId}
          />

          {/* <div>
          {typeof selectedNote === "string" ? (
            <NotePage noteId={selectedNote}></NotePage>
          ) : (
            <>
              <div style={{ display: "inline-block" }}>
                <Clients
                  selectedUserId={selectedUserId?.toString()}
                  clients={clients}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  marginLeft: "200px",
                }}
              >
                {typeof selectedUserId === "string" && (
                  <Editor clientId={selectedUserId} />
                )}
              </div>
              <div
                style={{
                  marginTop: "300px",
                  display: "inline-block",
                  marginLeft: "200px",
                }}
              >
                {typeof selectedUserId === "string" && (
                  <Sidebar selectedUserId={selectedUserId} />
                )}
              </div>
            </>
          )}
        </div> */}
        </div>
      </main>
    </div>
  );
}

interface FrameProps {
  clients: Client[];
  selectedUserId?: string;
  selectedNote?: string;
}

export const Frame = (props: FrameProps): JSX.Element => {
  const { clients, selectedUserId, selectedNote } = props;
  return (
    <div
      style={{ borderRightWidth: "1px", borderLeftWidth: "1px" }}
      className="inline-flex flex-col items-start relative"
    >
      <div className="flex justify-between">
        <div
          style={{ paddingTop: "50px" }}
          className="inline-flex flex-col items-start pl-[20px] pr-0 pt-0 pb-[100px] relative flex-[0_0_auto] border-r [border-right-style:solid] border-migration-border"
        >
          <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
            <div className="flex flex-col w-[280px] items-start gap-[12px] pl-0 pr-[20px] py-0 relative flex-[0_0_auto]">
              <div className="flex items-center gap-[40px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-migration-dark-font text-[14px] tracking-[0] leading-[22px]">
                  Clients
                </div>
                <ClientsIcon />
              </div>
              <Clients clients={clients} selectedUserId={selectedUserId} />
            </div>
            <div className="flex flex-col w-[280px] items-start gap-[16px] pl-0 pr-[20px] py-0 relative flex-[0_0_auto]"></div>
          </div>
        </div>
        {/** Show note content */}
        {selectedNote && <NotePage noteId={selectedNote} />}
      </div>
    </div>
  );
};

function ClientsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M9.85909 12.5537V11.4089C9.85909 10.8016 9.61785 10.2192 9.18845 9.78979C8.75904 9.36038 8.17664 9.11914 7.56937 9.11914H2.98992C2.38265 9.11914 1.80025 9.36038 1.37084 9.78979C0.941433 10.2192 0.700195 10.8016 0.700195 11.4089V12.5537"
        stroke="#212B36"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.27947 6.82945C6.54405 6.82945 7.56919 5.8043 7.56919 4.53972C7.56919 3.27514 6.54405 2.25 5.27947 2.25C4.01489 2.25 2.98975 3.27514 2.98975 4.53972C2.98975 5.8043 4.01489 6.82945 5.27947 6.82945Z"
        stroke="#212B36"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.2935 12.5535V11.4087C13.2931 10.9013 13.1242 10.4085 12.8134 10.0075C12.5026 9.60657 12.0674 9.32019 11.5762 9.19336"
        stroke="#212B36"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.28662 2.32422C9.77915 2.45033 10.2157 2.73677 10.5274 3.13839C10.8392 3.54002 11.0084 4.03397 11.0084 4.54239C11.0084 5.0508 10.8392 5.54476 10.5274 5.94638C10.2157 6.34801 9.77915 6.63445 9.28662 6.76056"
        stroke="#212B36"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
