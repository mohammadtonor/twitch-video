'use client';

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

interface ActionProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}: ActionProps) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const { userId } = useAuth();

    const handleFollow = () => {
        startTransition(()=> {
            onFollow(hostIdentity)
              .then((data) => toast.success(`You are now following ${data.following.userName}!`))
              .catch(() => toast.error("Somthing went wrong."))
        })
    }

    const handleUnFollow = () => {
        startTransition(()=> {
            onUnfollow(hostIdentity)
              .then((data) => toast.success(`You are now Unfollowing ${data.following.userName}!`))
              .catch(() => toast.error("Somthing went wrong."))
        })
    }

    const toggleFollow  = () => {
        if (!userId) {
            router.push("/sign-in");
        }

        if (isHost) return;

        if(isFollowing){
            handleUnFollow();
        } else {
            handleFollow()

        }
    }  

    return (
        <Button 
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant='primary'
            size='sm'
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing
                  ? "fill-white"
                  : "fill-none"
            )}/>
            {isFollowing 
              ? "unFollow"
              : "Follow"
            }
        </Button>
    )
}

export const ActionnSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}