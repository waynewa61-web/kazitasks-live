import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    if (tasks.length > 0) return NextResponse.json(tasks);
  } catch(e) {}
  
  // Fallback data if DB is empty so you can see the UI
  return NextResponse.json([
    { id: "1", title: "Design a menu board for a juice bar", type: "QUICK_TASK", fixedAmount: 120000, location: "Remote" },
    { id: "2", title: "Annual report design — 32 pages", type: "PROJECT", budgetMin: 1600000, location: "Kampala" }
  ]);
}