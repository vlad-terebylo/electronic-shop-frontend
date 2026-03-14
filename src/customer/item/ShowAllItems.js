import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SearchItemByTitle from "../../core/SearchItemByTitle";
import {addToCart} from "../cart/CartService";
import CartPopup from "../cart/CartPopup";
import AddToCartPopup from "../cart/AddToCartPopup";

const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupItem, setPopupItem] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:1409/api/items');
            const data = Array.isArray(res.data) ? res.data : res.data.items;
            setItems(data || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items', err);
            setError("Failed to load items");
            setLoading(false);
        }
    };

    const handleSearchByTitle = (title) => {
        if (!title) {
            setFilteredItems(items);
            return;
        }

        const filtered = items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
        setFilteredItems(filtered);
    };

    const handleAddClick = (item) => {
        setPopupItem(item);
    };

    const handleAddToCart = (item, quantity) => {
        const result = addToCart(item, quantity);
        if (result === false) alert(`Updated quantity for ${item.title} in cart`);
        else if (result === "exceed") alert(`Cannot add more than ${item.quantity} items`);
    };

    const closePopup = () => setPopupMessage(null);

    if (loading) return <p>Loading items...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div className="container">
            <h1>All Items</h1>
            <SearchItemByTitle onSearch={handleSearchByTitle}/>

            {(filteredItems || items).map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title || item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Manufacturer: {item.manufacturer}</p>

                    <button onClick={() => handleAddClick(item)} style={{marginLeft: '5px'}}>
                        Add to cart
                    </button>

                    <Link to={`/items/${item.id}`}>
                        <button style={{marginLeft: '5px'}}>View details</button>
                    </Link>
                </div>
            ))}

            {filteredItems && (
                <button onClick={() => setFilteredItems(null)} style={{marginBottom: "15px"}}>
                    Show All Items
                </button>
            )}

            {popupItem && (
                <AddToCartPopup
                    item={popupItem}
                    onClose={() => setPopupItem(null)}
                    onAdd={handleAddToCart}
                />
            )}

            {popupMessage && <CartPopup message={popupMessage} onClose={closePopup}/>}
        </div>
    );
};

export default ShowAllItems;