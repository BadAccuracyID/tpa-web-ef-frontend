import {useSearchParams} from "react-router-dom";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);
    console.log(searchParams.get("q"));

    return (
        <div>
            <h1>Search Page</h1>
        </div>
    )
}
