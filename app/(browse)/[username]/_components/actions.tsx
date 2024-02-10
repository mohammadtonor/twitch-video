'use client';

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
            .then((data) => toast.success(`You are now following ${data.following.userName}`))
            .catch(() => toast.error('Failed to follow!') );
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
              .then((data) => toast.success(`You are now unfollowed ${data.following.userName}`))
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

    return (
        <Button 
            disabled={ isPending}
            onClick={onClick}
            variant='primary'
        >
            {isFollowing  ? 'unfollow' : 'follow'}
        </Button>
    )
}