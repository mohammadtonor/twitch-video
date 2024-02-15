import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStream = async () => {
    let userId;

    try {
        const self = await getSelf();
    } catch {
        userId = null;
    }

    let streams = [];

    if (userId) {
        streams = await db.stream.findMany({
           where: {
             user: {
                NOT: {
                    blocking: {
                        none: {
                            blockedId: userId
                        }
                    }
                }
             }
           },
           select: {
              id: true,
              user: true,
              thumbnailUrl: true,
              name: true,
              isLive: true
           },
           orderBy: [
            {
                isLive: 'desc'
            },
            {
                updatedAt: 'desc'
            }
          ]
        })
    } else {
        streams =  await db.stream.findMany({
            select: {
                id: true,
                user: true,
                thumbnailUrl: true,
                name: true,
                isLive: true
             },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
    }

    return streams;
}