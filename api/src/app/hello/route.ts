import { NextResponse } from "next/server";

let count = 0;
export async function GET() {
  console.log("[/api/hello] called", count++);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("setTimeout called");

  return NextResponse.json({ data: "Hello World" });
}
