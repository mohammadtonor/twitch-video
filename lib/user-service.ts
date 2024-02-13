import { db } from "./db"

export const getUserByUsername = async (userName: string) => {
   const user = await db.user.findUnique({
     where: {
      userName
     },
     include: {
      streame: true
     }
   });
   
   return user;
}

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      streame: true
    }
  })

  return user;
}