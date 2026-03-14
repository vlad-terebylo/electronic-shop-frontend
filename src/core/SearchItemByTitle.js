import {useState} from "react";

const SearchItemByTitle = ({onSearch}) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!itemTitle) {
            setError("Please enter a valid item title");
            return;
        }

        setLoading(true);
        setError(null);

        onSearch(itemTitle);

        setLoading(false);
    };

    return (
        <div style={{marginBottom: "20px"}}>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search item by title"
                    value={itemTitle}
                    onChange={(e) => setItemTitle(e.target.value)}
                    style={{marginRight: "10px"}}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default SearchItemByTitle;
