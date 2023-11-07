import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { documentsTable, usersToDocumentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { updateDocSchema } from "@/validators/updateDocument";

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

// PUT /api/documents/:documentId
export async function PUT(
  req: NextRequest,
  { params }: { params: { docId: string } },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Check ownership of document
    const [doc] = await db
      .select({
        documentId: usersToDocumentsTable.documentId,
      })
      .from(usersToDocumentsTable)
      .where(
        and(
          eq(usersToDocumentsTable.userId, userId),
          eq(usersToDocumentsTable.documentId, params.docId),
        ),
      );
    if (!doc) {
      return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    }

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Partial<Omit<Document, "id">>;
    try {
      validatedReqBody = updateDocSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Update document
    const [updatedDoc] = await db
      .update(documentsTable)
      .set(validatedReqBody)
      .where(eq(documentsTable.displayId, params.docId))
      .returning();

    return NextResponse.json(
      {
        id: updatedDoc.displayId,
        title: updatedDoc.title,
        content: updatedDoc.content,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
