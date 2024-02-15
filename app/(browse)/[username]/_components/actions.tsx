'use client';

import { OnBlock, OnUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";


interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
      startTransition(() => {
          onFollow(userId)
            .then((data) => toast.success(`You are now following ${data?.following.userName}`))
            .catch(() => toast.error('Failed to follow!') );
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
              .then((data) => toast.success(`You are now unfollowed ${data?.following.userName}`))
              .catch(() => toast.error('Failed to unfollow!') );
          })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }
    
    const handleBlock = () => {
        startTransition(() => {
            OnBlock(userId)
                .then((data) => toast.success(`You are now Block ${data?.blocked.userName}`))
                .catch(() => toast.error('Something went wrong!'));
        })
    }


    return (
        <>
            <Button 
                disabled={ isPending}
                onClick={onClick}
                variant='primary'
                >
                {isFollowing  ? 'unfollow' : 'follow'}
            </Button>
            <Button
                onClick={handleBlock}
                disabled={isPending}
            >
                Block
            </Button>
        </>

    )
}