import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const UpdateItem = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

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

    const validate = () => {
        const newErrors = {};

        if (!item.title || !item.title.trim()) newErrors.title = 'Title is required';
        if (!item.price || isNaN(item.price) || parseInt(item.price) <= 0)
            newErrors.price = 'Price must be a positive number';
        if (!item.quantity || isNaN(item.quantity) || parseInt(item.quantity) <= 0)
            newErrors.quantity = 'Quantity must be a positive number';
        if (!item.itemTypeId) newErrors.itemTypeId = 'Please select an item type';


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await axios.put(`http://localhost:1409/shop/items/${id}`, item);
            navigate('/');
        } catch (err) {
            console.error('Error updating item', err);
            alert('Failed to save changes')
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
                />
                {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}

                <input
                    type="number"
                    value={item.price}
                    onChange={e => setItem({...item, price: parseInt(e.target.value)})}
                />
                {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}

                <input
                    type="number"
                    value={item.quantity}
                    onChange={e => setItem({...item, quantity: parseInt(e.target.value)})}
                />
                {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}

                <select value={item.itemTypeId}
                        onChange={e => setItem({...item, itemTypeId: parseInt(e.target.value)})}>
                    <option value="">Select Item Type</option>
                    {itemTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.title}</option>
                    ))}
                </select>
                {errors.itemTypeId && <p style={{color: 'red'}}>{errors.itemTypeId}</p>}

                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate(-1)} style={{marginLeft: '10px'}}>
                    ← Home
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;