// app/api/sheet/route.ts
import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/googleSheet";

export async function GET() {
  try {
    const rows = await getSheetData(process.env.SHEET_ID!, "wood!A:A");
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching sheet:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
