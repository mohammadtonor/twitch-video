"use client";

import { toast } from "sonner";
import { OnBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: CommunityItemProps) => {
    const [isPending, startTransition] = useTransition();

    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleClick = () => {
        if (!participantName || isSelf || !isHost) return;

        startTransition(() => {
            OnBlock(participantIdentity)
              .then(() => toast.success(`Blocked ${participantName}!`))
              .catch(() => toast.error('Something went happen.'))
        })
    }

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/10",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={{color: color}}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button 
                        variant='ghost'
                        disabled={isPending}
                        onClick={handleClick}
                        className="h-auto w-auto p-1 opacity-0 hover:opacity-100 transition">
                        <MinusCircle className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                </Hint>
            )}
        </div>
    )
}