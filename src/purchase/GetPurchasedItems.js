import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const res = await axios.get("http://localhost:1409/api/purchase");
            setPurchases(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching purchases:", err);
            setError("Failed to load purchases");
            setLoading(false);
        }
    };

    if (loading) return <p>Loading purchases...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;
    if (!purchases.length) return <p>No purchases yet.</p>;

    return (
        <div>
            <h1>All Items</h1>

            {purchases.map(purchase => (
                <div key={purchase.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{purchase.email}</h3>
                    <p>Price: {purchase.cardNumber}</p>
                    <p>Quantity: {purchase.itemIds}</p>
                </div>
            ))}
            <button onClick={() => navigate(-1)} style={{margin: '10px'}}>
                ← Home
            </button>
        </div>
    );
};

export default PurchasesPage;
