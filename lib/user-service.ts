import { db } from "./db"

export const getUserByUsername = async (userName: string) => {  
   const user = await db.user.findUnique({
     where: {
      userName
     },
     select:{
      id: true,
      externalUserId: true,
      userName: true,
      bio: true,
      imageUrl: true,
      streame: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true
        }
      }
     }
   });   
   console.log(user);
   
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