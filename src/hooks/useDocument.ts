import { useState } from "react";

import { useParams } from "next/navigation";

import type { Document } from "@/lib/types/db";

export const useDocument = () => {
  const { docId: documentId } = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  return {
    documentId,
    document,
    setDocument,
  };
};
