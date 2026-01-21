import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';


const ShowItemById = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (producingYear) => {
        return producingYear[2] + ' / ' + producingYear[1] + ' / ' + producingYear[0];
    };

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
                <li><strong>Title:</strong> {item.title}</li>
                <li><strong>Price:</strong> {item.price}</li>
                <li><strong>Quantity:</strong> {item.quantity}</li>
                <li><strong>Producing Year:</strong> {formatDate(item.producingYear)}</li>
            </ul>
        </div>
    );
};

export default ShowItemById;
