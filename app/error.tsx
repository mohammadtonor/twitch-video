'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center">
            <p>
                SomeThing went wrong.
            </p>
            <Button variant='secondary' asChild>
                <Link href='/'>
                    Go back home
                </Link>
            </Button>
        </div>
    )
}

export default NotFoundPage;