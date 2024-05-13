import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function insertUser(
//   username: string,
//   password: string,
//   firstName: string,
//   lastName: string
// ) {
//   const res = await prisma.user.create({
//     data: { username, password, firstName, lastName },
//   });
//   console.log(res);
// }

// insertUser("vinit", "12345", "Vinit", "Tyagi");

// interface Updateparams {
//   firstName: string;
//   lastName: string;
// }

// async function updateUser(username: string, updateOb: Updateparams) {
//   const res = await prisma.user.update({
//     where: { username },
//     data: { firstName: updateOb.firstName, lastName: updateOb.lastName },
//   });
//   console.log(res)
// }

// updateUser("vinit", { firstName: "B", lastName: "C" });

async function getUser(username: string) {
    const res = await prisma.user.findFirst({where:{username}})
    console.log(res)
}

getUser('vinit')
