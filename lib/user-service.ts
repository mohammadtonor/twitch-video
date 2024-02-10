import { db } from "./db"

export const getUserByUsername = async (userName: string) => {
   const user = await db.user.findUnique({
     where: {
      userName
     }
   });
   
   return user;
}