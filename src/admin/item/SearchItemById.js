import {useState} from "react";


const ItemSearchById = ({onSearch}) => {
    const [itemId, setItemId] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!itemId || isNaN(itemId)) {
            setError("Please enter a valid item ID");
            return;
        }

        setLoading(true);
        setError(null);

        onSearch(Number(itemId));

        setLoading(false);
    };

    return (
        <div style={{marginBottom: "20px"}}>
            <form onSubmit={handleSearch}>
                <input
                    type="number"
                    placeholder="Search item by ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
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

export default ItemSearchById;
