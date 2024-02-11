'use server';

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const OnBlock = async (id: string) => {
    const blockedUser = await blockUser(id);

    revalidatePath('/');

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.userName}`);
    }

    return blockedUser;
} 

export const OnUnblock  = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    revalidatePath('/');

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.userName}`);
    }

    return unblockedUser; 
}