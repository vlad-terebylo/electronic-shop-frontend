import {useState, useEffect} from "react";
import apiClient from "../../core/ApiClient";
import {useNavigate} from "react-router-dom";

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [itemsMap, setItemsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const res = await apiClient.get("authenticated/purchase");
            const itemsRes = await apiClient.get("/items");

            const map = {};
            itemsRes.data.forEach(item => {
                map[item.id] = item.title;
            });

            setItemsMap(map);
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

    return (
        <div className="container">
            <h1>All purchases</h1>

            {purchases.map(purchase => (
                <div key={purchase.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <ul>
                        <li><strong>Customer email:</strong> {purchase.email}</li>
                        <li><strong>Purchase price:</strong> {purchase.totalPrice}</li>
                        <li><strong>Items:</strong></li>
                        {purchase.purchaseItems.map((item, index) => (
                            <div key={index} style={{margin: "20px"}}>
                                <li><strong>Item ID:</strong> {item.itemId}</li>
                                <li><strong>Item:</strong> {itemsMap[item.itemId] || `Item #${item.itemId}`}</li>
                                <li><strong>Quantity:</strong> {item.quantity}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={() => navigate(-1)} style={{margin: '10px'}}>
                ← Home
            </button>
        </div>
    );
};

export default PurchasesPage;
