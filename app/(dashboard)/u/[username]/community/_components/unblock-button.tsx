'use client';


import { toast } from "sonner";
import { startTransition, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { OnUnblock } from "@/actions/block";

interface UnblockButtonProps {
    userId: string;
}

export const UnblockButton = ({
    userId
}: UnblockButtonProps) => {
    const [isPending, stattTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            OnUnblock(userId)
              .then((result) => toast.success(`User ${result.blocked.userName} unblocked`))
              .catch(() => toast.error("Somthing went wrong."))
        });
    }
    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            size='sm'
            variant='link'
            className="text-blue-500 w-full"
        >
            Unblock
        </Button>
    )
}