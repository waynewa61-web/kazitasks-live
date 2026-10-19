import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash("Password123!", 10);
  const user = await prisma.user.upsert({
    where: { email: "daniel@kazitasks.test" },
    update: {},
    create: {
      email: "daniel@kazitasks.test", name: "Daniel Kato", passwordHash: pw, role: "CLIENT",
      wallet: { create: { balance: 1240000, escrow: 680000 } }
    }
  });
  
  await prisma.task.createMany({
    data: [
      { title: "Design a menu board for a juice bar", description: "Clean A1 menu board.", type: "QUICK_TASK", fixedAmount: 120000, clientId: user.id },
      { title: "Annual report design — 32 pages", description: "Design our 2026 annual report.", type: "PROJECT", budgetMin: 1600000, clientId: user.id }
    ]
  });
  
  console.log("Seeded database. Login: daniel@kazitasks.test / Password123!");
}
main().finally(() => prisma.$disconnect());
