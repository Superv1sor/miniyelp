
import SearchForm from "./SearchForm";

export default function Header({setQuery}) {
    return (
    <header >
        <div className="logo"><a href="./">Home</a></div><div className="searchBar"><SearchForm setQuery={setQuery} /></div>
        <div className="clear"></div>
    </header>
    );
}
