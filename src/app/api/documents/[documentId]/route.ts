import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { usersToDocumentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// GET /api/documents/:documentId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      documentId: string;
    };
  },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Get the document
    const dbDocument = await db.query.usersToDocumentsTable.findFirst({
      where: and(
        eq(usersToDocumentsTable.userId, userId),
        eq(usersToDocumentsTable.documentId, params.documentId),
      ),
      with: {
        document: {
          columns: {
            displayId: true,
            title: true,
            content: true,
          },
        },
      },
    });
    if (!dbDocument?.document) {
      return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    }

    const document = dbDocument.document;
    return NextResponse.json(
      {
        id: document.displayId,
        title: document.title,
        content: document.content,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
