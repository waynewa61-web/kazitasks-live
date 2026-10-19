import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const wallet = await prisma.wallet.findFirst({ include: { transactions: true } });
  return NextResponse.json({ wallet, transactions: wallet?.transactions || [] });
}
