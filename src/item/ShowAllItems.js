import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:1409/shop/items')
            .then(response => {
                console.log('Server response:', response.data);
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else if (response.data.items) {
                    setItems(response.data.items);
                } else {
                    setItems([]);
                    console.warn('Data is not an array', response.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error during getting data:', err);
                setError('Failed to fetch items');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>{error}</p>;
    if (!items.length) return <p>No items found</p>;

    return (
        <div>
            <h1>All Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <Link to={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                            {item.name || item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowAllItems;
