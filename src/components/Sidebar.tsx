"use client";

import { useState } from "react";

interface Props {
  selectedUserId: string;
}

export function Sidebar(props: Props) {
  const { selectedUserId } = props;
  const [lastChangedValue, setLastChangedValue] = useState("");
  return (
    <>
      Notes
      <div>{localStorage.getItem(selectedUserId)}</div>
    </>
  );
}
