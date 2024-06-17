import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

let count = 0;
export async function GET() {
  console.log("[/api/hello] called", count++);
  return NextResponse.json({ data: "Hello World" });
}
