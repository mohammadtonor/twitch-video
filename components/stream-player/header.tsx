'use client';

import {useParticipants, useRemoteParticipant} from '@livekit/components-react';
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerfiedMark } from "../varified-mark";
import { Divide, UserIcon } from 'lucide-react';
import { ActionnSkeleton, Actions } from './actions';
import { Skeleton } from '../ui/skeleton';

interface HeaderProps {
    hostName: string;
    hostIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    viewerIdentity: string;
    name: string;
}

export const Header = ({
    imageUrl,
    hostIdentity,
    hostName,
    isFollowing,
    name,
    viewerIdentity
}: HeaderProps) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar 
                    imageUrl={imageUrl}
                    username={hostName}
                    size="lg"
                    isLive={isLive}
                    showBadge
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2>
                            {hostName}
                        </h2>
                        <VerfiedMark />
                    </div>
                    <p className='text-sm font-semibold'>
                        {name}
                    </p>
                    {isLive ? (
                        <div className='text-xs font-semibold flex gap-x-1 items-center text-rose-500'>
                            <UserIcon className='w-4 h-4'/>
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewer"}
                            </p>
                        </div>
                    ) : (
                        <p className='font-semibold text-xs text-muted-foreground'>
                            Ofline
                        </p>
                    )}
                </div>
            </div>
            <Actions 
                isFollowing={isFollowing}
                hostIdentity={hostIdentity}
                isHost={isHost}
            />
        </div>
    )
}

export const HeaderSkeleton = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
            <div className='flex items-center gap-x-2'>
                <UserAvatarSkeleton />
                <div className='space-y-2'>
                    <Skeleton className='h-6 w-32'/>
                    <Skeleton className='h-6 w-24'/>
                </div>
            </div>
            <ActionnSkeleton />
        </div>
    )
}