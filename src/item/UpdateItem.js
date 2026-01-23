import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const UpdateItem = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:1409/shop/items/${id}`)
            .then(res => {
                setItem(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
        axios.get('http://localhost:1409/shop/itemTypes')
            .then(res => {
                setItemTypes(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1409/shop/items/${id}`, item);
            navigate('/');
        } catch (err) {
            console.error('Error updating item', err);
        }
    };

    if (loading) return <p>Loading item...</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <div>
            <h2>Update Item: {item.title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={item.title}
                    onChange={e => setItem({...item, title: e.target.value})}
                    required
                />
                <input
                    type="number"
                    value={item.price}
                    onChange={e => setItem({...item, price: parseInt(e.target.value)})}
                    required
                />
                <input
                    type="number"
                    value={item.quantity}
                    onChange={e => setItem({...item, quantity: parseInt(e.target.value)})}
                    required
                />
                <select value={item.itemTypeId}
                        onChange={e => setItem({...item, itemTypeId: parseInt(e.target.value)})}>
                    <option value="">Select Item Type</option>
                    {itemTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.title}</option>
                    ))}
                </select>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate(-1)} style={{marginLeft: '10px'}}>
                    ← Home
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;
