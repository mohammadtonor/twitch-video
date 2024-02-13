'use client';

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowing: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
}

export const ChatForm = ({
    onSubmit,
    onChange,
    value,
    isHidden,
    isFollowing,
    isFollowersOnly,
    isDelayed
}: ChatFormProps) => {
    const [isDelayBlocked, setIsDeleyBlock] = useState(false);

    const isFollowersOnlyAndNotFollowimg = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowimg;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value || isDisabled) return;

        if(isDelayed && !isDelayBlocked ) {
            setIsDeleyBlock(true);
            setTimeout(() => {
                setIsDeleyBlock(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }

    }

    if (isHidden) {
        return null;
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full">
                <ChatInfo 
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                />
                <Input
                    onChange={(e) =>  onChange(e.target.value)}
                    value={value}
                    disabled={false}
                    placeholder="Send a message..."
                    className={cn(
                        "border-white/10",
                        isFollowersOnly && "rounded-t-none border-t-0"
                        )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant='primary'
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col item-center gap-y-4 p-3">
            <Skeleton className="w-full h-10"/>
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7"/>
                <Skeleton className="h-7 w-12"/>
            </div>
        </div>
    )
}