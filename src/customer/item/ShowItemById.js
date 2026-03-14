import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom';
import {addToCart} from "../cart/CartService";
import CartPopup from "../cart/CartPopup";
import AddToCartPopup from "../cart/AddToCartPopup";


const ShowItemByIdU = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypeTitle, setItemTypeTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupItem, setPopupItem] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);


    const formatDate = (producingYear) => {
        return producingYear[2] + ' / ' + producingYear[1] + ' / ' + producingYear[0];
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await axios.get(`http://localhost:1409/api/items/${id}`);
                const data = item.data;
                setItem(item.data);

                const itemType = await axios.get(`http://localhost:1409/api/itemTypes/${data.itemTypeId}`);
                setItemTypeTitle(itemType.data.title);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleAddClick = (item) => {
        setPopupItem(item);
    };

    const handleAddToCart = (item, quantity) => {
        const result = addToCart(item, quantity);
        if (result === false) alert(`Updated quantity for ${item.title} in cart`);
        else if (result === "exceed") alert(`Cannot add more than ${item.quantity} items`);
    };

    const closePopup = () => setPopupMessage(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="container">
            <h1>Item Details</h1>
            <ul>
                <li><strong>Title:</strong> {item.title}</li>
                <li><strong>Price:</strong> {item.price}</li>
                <li><strong>Quantity:</strong> {item.quantity}</li>
                <li><strong>Producing Year:</strong> {formatDate(item.producingYear)}</li>
                <li><strong>Manufacturer:</strong> {item.manufacturer}</li>
                <li><strong>Type:</strong> {itemTypeTitle}</li>
            </ul>
            <button onClick={() => navigate(-1)} className="button-group">
                ← Home
            </button>
            <button onClick={() => handleAddClick(item)} className="button-group">
                Add to cart
            </button>

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

export default ShowItemByIdU;
