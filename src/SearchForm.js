import React, { useState } from "react";

export default function SearchForm ({setQuery}) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        setQuery(value);
        // setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Restaurants" className="SearchInput" value = "Restaurants" editable = {false} />
            <input type="search" placeholder="City" className="SearchInput" value={value} onChange={e => setValue(e.target.value)} />
            <button className="searchButton">Search</button>
        </form>
    )
}