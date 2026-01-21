import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:1409/shop/items');
            const data = Array.isArray(res.data) ? res.data : res.data.items;
            setItems(data || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:1409/shop/items/${id}`);
            fetchItems();
        } catch (err) {
            console.error('Error deleting item', err);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1409/shop/items/${editingItem.id}`, editingItem);
            setEditingItem(null);
            fetchItems();
        } catch (err) {
            console.error('Error updating item', err);
        }
    };

    if (loading) return <p>Loading items...</p>;
    if (!items.length) return <p>No items found</p>;

    return (
        <div>
            <h1>All Items</h1>

            {items.map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title || item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Manufacturer: {item.manufacturer}</p>

                    <Link to={`/item/${item.id}`}>
                        <button>View details</button>
                    </Link>
                    <button onClick={() => navigate(`/update/${item.id}`)} style={{marginLeft: '5px'}}>
                        Update info
                    </button>
                    <button onClick={() => handleDelete(item.id)} style={{marginLeft: '5px', color: 'red'}}>
                        Remove item
                    </button>
                </div>
            ))}

            {editingItem && (
                <div style={{border: '2px solid blue', padding: '15px', marginTop: '20px'}}>
                    <h2>Update Item: {editingItem.title || editingItem.name}</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value)})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={editingItem.quantity}
                            onChange={(e) => setEditingItem({...editingItem, quantity: parseInt(e.target.value)})}
                            required
                        />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditingItem(null)} style={{marginLeft: '10px'}}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ShowAllItems;
