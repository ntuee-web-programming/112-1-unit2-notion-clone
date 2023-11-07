"use client";

import { signOut, useSession } from "next-auth/react";

function CSRDemo() {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1 className="text-xl">CSR Demo</h1>
      <p className="mb-4 text-lg">Client Side Rendering</p>
      <p className="my-4">{status}</p>
      <p className="my-4">{JSON.stringify(session, null, 2)}</p>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
export default CSRDemo;
