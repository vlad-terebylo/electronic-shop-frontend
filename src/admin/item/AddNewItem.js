import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiClient from '../../core/ApiClient';


const AddNewItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [producingYear, setProducingYear] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [itemTypeId, setItemTypeId] = useState('');

    const [itemTypes, setItemTypes] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('http://localhost:1409/api/itemTypes')
            .then(res => setItemTypes(res.data))
            .catch(err => console.error('Error fetching item types:', err));
    }, []);

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = 'Title is required';
        if (!price || isNaN(price) || parseInt(price) <= 0) newErrors.price = 'Price must be a positive number';
        if (!producingYear) newErrors.producingYear = 'Producing year is required';
        if (!manufacturer || !manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required';
        if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) newErrors.quantity = 'Quantity must be a positive number';
        if (!itemTypeId) newErrors.itemTypeId = 'Please select an item type';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleAddItem = async () => {
        if (!validate()) return;

        try {
            await apiClient.post('http://localhost:1409/api/items', {
                title: title.trim(),
                price: parseInt(price),
                producingYear: producingYear,
                manufacturer: manufacturer.trim(),
                quantity: parseInt(quantity),
                itemTypeId: parseInt(itemTypeId)
            });

            setTitle('');
            setPrice('');
            setProducingYear('');
            setManufacturer('');
            setQuantity('');
            setItemTypeId('');
            navigate('/admin')
        } catch (error
            ) {
            console.log("Error - ", error);
            alert("Failed to add new item");
        }
    };

    return (
        <div className="container">
            <h2>Add item</h2>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
            <p></p>

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
            <p></p>

            <input
                type="datetime-local"
                placeholder="Producing date"
                value={producingYear}
                onChange={(e) => setProducingYear(e.target.value)}
            />
            {errors.producingYear && <p style={{color: 'red'}}>{errors.producingYear}</p>}
            <p></p>

            <input
                type="text"
                placeholder="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
            />
            {errors.manufacturer && <p style={{color: 'red'}}>{errors.manufacturer}</p>}
            <p></p>

            <input
                type="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
            <p></p>

            <select value={itemTypeId} onChange={e => setItemTypeId(e.target.value)}>
                <option value="">Select Item Type</option>
                {itemTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.title}</option>
                ))}
            </select>
            {errors.itemTypeId && <p style={{color: 'red'}}>{errors.itemTypeId}</p>}
            <p></p>

            <button onClick={handleAddItem}>Add new item</button>
            <button onClick={() => navigate(-1)} style={{margin: '10px'}}>
                ← Home
            </button>
        </div>
    );
};

export default AddNewItem;