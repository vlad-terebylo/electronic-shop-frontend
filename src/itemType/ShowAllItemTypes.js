import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const ShowAllItemTypes = () => {
    const [itemTypes, setItemType] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItemTypes();
    }, []);

    const fetchItemTypes = async () => {
        try {
            const itemTypeList = await axios.get('http://localhost:1409/shop/itemTypes');
            const data = Array.isArray(itemTypeList.data) ? itemTypeList.data : itemTypeList.data.itemType;
            setItemType(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items', error);
            setLoading(false);
        }
    }

    if (loading) return <p>Loading items...</p>;
    if (!itemTypes.length) return <p>No items found</p>;

    return (
        <div>
            <h1>All item types</h1>

            {itemTypes.map(itemType => (
                <div key={itemType.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h2>{itemType.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default ShowAllItemTypes;
