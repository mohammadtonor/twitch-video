'use client';

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";


interface ContainerProps {
    children: React.ReactNode
}

export const Container = ({
    children,
}: ContainerProps) => {
    const {
        collapsed,
        onExpanded,
        onCollapse
    } = useCreatorSidebar(state => state);

    const maches = useMediaQuery(`(max-width: 1024px)`);

    useEffect(() => {
        if (maches) {
            onCollapse();
        } else {
            onExpanded();
        }
    }, [maches, onCollapse, onExpanded])
    return (
        <div className={cn(
                'flex-1',
                collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
            )}>
            {children}
        </div>
    )
}