'use client';

import { useRef, useState, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { FullscreanControll } from "./fullscrean-control";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
    participent: Participant
}

export const LiveVideo = ({
    participent
}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscrean, setIsFullscreane] = useState(false);
    const [volume, setVolume] = useState(0);

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    useEffect(() => {
        onVolumeChange(0);
    }, [])

    const toggleMute = () => {
        const isMuted = volume === 0;

        setVolume(isMuted ? 50 : 0);

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted ;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    };

    const onToggleFullscrean = () => {
        if (isFullscrean) {
            document.exitFullscreen();
        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen();
        }
    }

    const handleFullscreanChange = () => {
        const isCurrentlyFullscrean  = document.fullscreenElement !== null;
        setIsFullscreane(isCurrentlyFullscrean);
    }

    useEventListener("fullscreenchange", handleFullscreanChange, wrapperRef);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter(track => track.participant.identity === participent.identity)
        .forEach(track => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });

    return (
        <div 
            ref={wrapperRef}
            className="relative h-full flex">
            <video 
                ref={videoRef}
                width='100%'
            />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl 
                        onChange={onVolumeChange}
                        value={volume}
                        onToggle={toggleMute}
                    />
                    <FullscreanControll
                        isFullscrean={isFullscrean}
                        onToggle={onToggleFullscrean}
                    />
                </div>
            </div>
        </div>
    )
}