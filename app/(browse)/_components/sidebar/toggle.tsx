'use client';

import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../../../../components/hint";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export const Toggle = () => {

    const {
        collapsed,
        onExpanded,
        onCollapse
    } = useSidebar((state) => state);

    const label = collapsed ? 'Expanded' : 'Collapse';

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint side="right" asChild label={label}>
                        <Button
                            onClick={onExpanded}
                            className="h-auto p-2"
                            variant='ghost'
                            >
                            <ArrowRightFromLine className="h-4 w-4"/>
                        </Button>
                        </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">
                        for you
                    </p>
                    <Hint
                        label={label} side="right" asChild>
                        <Button
                            onClick={onCollapse}
                            variant='ghost'
                            className="ml-auto p-2 h-auto">
                            <ArrowLeftFromLine className="w-4 h-4"/>
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]"/>
            <Skeleton className="h-6 w-6"/>
        </div>
    )
}