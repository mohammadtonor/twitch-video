'use client'
import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

 

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export const ChatComunnity = ({
    hostName,
    viewerName,
    isHidden,
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const participents = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue)
    }

    const filterParticipant  = useMemo(() => {
        const deduped = participents.reduce((acc, participent) => {
            const hostAsViewer = `host-${participent.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participent);
            }
            return acc
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((participent) => {
            return participent.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });
    }, [participents, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        )
    }
    return (
        <div className="p-4">
            <Input 
                onChange={e => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-primary-foreground hidden last:block p-2">
                    No result
                </p>
                {filterParticipant.map((participent) => (
                    <CommunityItem
                        key={participent.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participent.name}
                        participantIdentity={participent.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    );
}