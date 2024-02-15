import { getSearch } from "@/lib/search-service";

interface ResultProps {
    term?: string;
}

export const Result  = async ({
    term
}: ResultProps) => {
    const data = await getSearch(term)

    return (
        <div>
            <h2>
                Result for term &apos;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No resuts found. Try Searching for something else
                </p>
            )}
        </div>
    )
}

export const ResultSkeleton = () => {
    return (
        <div>

        </div>
    )
}