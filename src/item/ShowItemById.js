import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const ShowItemById = () => {
    const { id } = useParams(); // Получаем id из URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:1409/shop/items/${id}`)
            .then(response => {
                setItem(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!item) return <p>The object was not found</p>;

    return (
        <div>
            <h1>Item Details</h1>
            <ul>
                {Object.entries(item).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowItemById;
