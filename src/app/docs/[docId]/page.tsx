"use client";

import { useDocument } from "@/hooks/useDocument";

function DocPage() {
  const { documentId } = useDocument();
  return <div>Doc ID: {documentId}</div>;
}

export default DocPage;
