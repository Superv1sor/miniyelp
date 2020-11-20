
import SearchForm from "./SearchForm";

export default function Header({setQuery}) {
    return (
    <header >
        <SearchForm setQuery={setQuery} />
    </header>
    );
}
