import { getSearch } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultProps {
    term?: string;
}

export const Result  = async ({
    term
}: ResultProps) => {
    const data = await getSearch(term)

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Result for term &apos;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No resuts found. Try Searching for something else
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard data={result} key={result.id}/>
                ))}
            </div>
        </div>
    )
}

export const ResultSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4"/>
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_,i) => (
                    <ResultCardSkeleton key={i}/>
                ))}
            </div>
        </div>
    )
}