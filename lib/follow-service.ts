import { getSelf } from "./auth-service";
import { db } from "./db";


export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id
            },
            include: {
                following: true,
            },
        });

        return followedUsers;
    } catch {
        return [];
    }
}

export const isfollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {id},
        });

        if(!otherUser) {
            throw new Error("User not found");
        }

        if(otherUser.id === self.id) {
            return true;
        }

         const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            }
         });

         return !!existingFollow;
    } catch {
        return false;
    }
}

export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found");
    }

    if(otherUser.id === self.id) {
        throw new Error("Cannot fol;low yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });

    if(existingFollow) {
        throw new Error('Already following');
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            follower: true,
            following: true,
        }
    });

    return follow;
}

export const unfollowUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id
        },
    });

    if (!otherUser) {
        throw new Error('User not found');
    }

    if (otherUser.id === self.id) {
        throw new Error('Cannot Unfollow yourself!')
    }

    const existingfollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        },
    });

    if (!existingfollow) {
        throw new Error('Not following');
    }

    const follow = await db.follow.delete({
        where: {
            id: existingfollow.id
        },
        include: {
            following: true
        },
    });

    return follow; 
}