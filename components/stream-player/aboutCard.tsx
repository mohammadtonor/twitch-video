'use client';

import { VerfiedMark } from "../varified-mark";

interface AboutCardprops {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followersCount: number;
}

export const AboutCard = ({
    bio,
    hostName,
    hostIdentity,
    followersCount,
    viewerIdentity
}: AboutCardprops) => {
    const hostAsviewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsviewer;
    
    const followedByLabel = followersCount === 1 ? "follower" : "followers"  
    
    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerfiedMark />
                    </div>
                    {isHost && (
                        <p>Edit</p>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{followersCount}
                    </span> {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio || "This user prefers to keep an air of mystry about them."}
                </p>
            </div>
        </div>
    )
}