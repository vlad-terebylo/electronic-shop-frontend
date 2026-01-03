import {useState, useEffect} from 'react';
import axios from 'axios';

const AddNewItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [producingYear, setProducingYear] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [itemTypeId, setItemTypeId] = useState('');

    const handleAddItem = async () => {
        try {
            const response = await axios.post('http://localhost:1409/shop/items', {
                title: title,
                price: parseInt(price),
                producingYear: producingYear,
                manufacturer: manufacturer,
                quantity: parseInt(quantity),
                itemTypeId: parseInt(itemTypeId)
            });

            console.log('Item was added: ', response.data);

            setTitle('');
            setPrice('');
            setProducingYear('');
            setManufacturer('');
            setQuantity('');
            setItemTypeId('');
        } catch (error
            ) {
            console.log("Error - ", error);
        }
    };

    return (
        <div>
            <h2>Add item</h2>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="datetime-local"
                placeholder="Producing date"
                value={producingYear}
                onChange={(e) => setProducingYear(e.target.value)}
            />

            <input
                type="text"
                placeholder="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
            />
            <input
                type="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <input
                type="number"
                placeholder="Item type id"
                value={itemTypeId}
                onChange={(e) => setItemTypeId(e.target.value)}
            />

            <button onClick={handleAddItem}>Add new item</button>
        </div>
    );
};

export default AddNewItem;