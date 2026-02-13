import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ItemSearchById = () => {
    const [itemId, setItemId] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!itemId || isNaN(itemId)) {
            setError("Please enter a valid item ID");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.get(`http://localhost:1409/shop/items/${itemId}`);
            navigate(`/items/${itemId}`);
        } catch (err) {
            setError("Item with this ID was not found");
        } finally {
            setLoading(false);
        }
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