"use client";

import { useParams } from "next/navigation";

function DocPage() {
  const { docId } = useParams();
  return <div>Doc ID: {docId}</div>;
}

export default DocPage;
