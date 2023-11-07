"use client";

import { useDocument } from "@/hooks/useDocument";

function DocPage() {
  const { documentId, document } = useDocument();
  return (
    <div>
      <h1>Doc ID: {documentId}</h1>
      <p>{JSON.stringify(document, null, 2)}</p>
    </div>
  );
}

export default DocPage;
