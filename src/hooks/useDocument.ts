import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import type { Document } from "@/lib/types/db";

export const useDocument = () => {
  const { docId: documentId } = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!documentId) return;
    const fetchDocument = async () => {
      const res = await fetch(`/api/documents/${documentId}`);
      if (!res.ok) {
        setDocument(null);
        router.push("/docs");
        return;
      }
      const data = await res.json();
      setDocument(data);
    };
    fetchDocument();
  }, [documentId, router]);

  return {
    documentId,
    document,
  };
};
