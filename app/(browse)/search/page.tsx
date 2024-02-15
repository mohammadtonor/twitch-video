import { redirect } from "next/navigation";
import { Result, ResultSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchPageParams {
    searchParams: {
        term?: string;
    };
};

const SearchPage = ({
    searchParams
}: SearchPageParams) => {
    if (!searchParams.term) {
        redirect("/");
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultSkeleton />}>
                <Result term={searchParams.term}/>
            </Suspense>
        </div>
    )
}

export default SearchPage;