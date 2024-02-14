'use client';

import { 
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export const Video = ({
    hostIdentity,
    hostName
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participent = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity)

    let content;

    if (!participent && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName}/>
    } else if (!participent || tracks.length === 0) {
        content = <LoadingVideo label={connectionState}/>
    } else {
        content = <LiveVideo participent={participent}/>
    }

    return (
        <div className="aspect-video border-b group relative">
            {content}
        </div>
    )
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none"/>
        </div>
    )
}