'use client';

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullscreanControllProps {
    isFullscrean: boolean;
    onToggle: () => void;
 }

export const FullscreanControll = ({
    isFullscrean,
    onToggle
}: FullscreanControllProps) => {
    const Icon = isFullscrean ? Minimize : Maximize;

    const label = isFullscrean ? "Exit fullscrean" : "Enter fullscrean";

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-5 w-5"/>
                </button>
            </Hint>
        </div>
    )
}