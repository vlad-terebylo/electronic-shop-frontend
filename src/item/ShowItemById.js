import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom';


const ShowItemById = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypeTitle, setItemTypeTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const formatDate = (producingYear) => {
        return producingYear[2] + ' / ' + producingYear[1] + ' / ' + producingYear[0];
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await axios.get(`http://localhost:1409/shop/items/${id}`);
                const data = item.data;
                setItem(item.data);

                const itemType = await axios.get(`http://localhost:1409/shop/itemTypes/${data.itemTypeId}`);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!item) return <p>The object was not found</p>;
    return (
        <div>
            <h1>Item Details</h1>
            <ul>
                <li><strong>Title:</strong> {item.title}</li>
                <li><strong>Price:</strong> {item.price}</li>
                <li><strong>Quantity:</strong> {item.quantity}</li>
                <li><strong>Producing Year:</strong> {formatDate(item.producingYear)}</li>
                <li><strong>Manufacturer:</strong> {item.manufacturer}</li>
                <li><strong>Type:</strong> {itemTypeTitle}</li>
            </ul>
            <button onClick={() => navigate(-1)} style={{margin: '10px'}}>
                ← Home
            </button>
        </div>
    );
};

export default ShowItemById;
