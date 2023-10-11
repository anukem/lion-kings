import { Clients } from "@/components/Clients";
import { Editor } from "@/components/Editor";
import { Sidebar } from "@/components/Sidebar";
import { Client, Company, CopilotAPI } from "@/utils/copilotApiUtils";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
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
              width: "200px",
              display: "inline-block",
              marginLeft: "200px",
            }}
          >
            {typeof selectedUserId === "string" && (
              <Sidebar selectedUserId={selectedUserId} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
