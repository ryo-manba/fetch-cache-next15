import { NextResponse } from "next/server";

let count = 0;
export async function GET() {
  console.log("[/api/slow-hello] called", count++);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json({ data: "Slow Hello World" });
}
